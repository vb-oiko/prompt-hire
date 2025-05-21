import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import PositionTable, { Position } from "../tables/PositionTable.ts";
import { POSITION_STATUS } from "../tables/PositionTable.ts";
import { optimizeResume } from "../services/ai/prompts/ResumeOptimizationPrompt.ts";
import UserInfoTable from "../tables/UserInfoTable.ts";
import { createDocuments } from "../services/GDocService.ts";
import {
  parseResume,
  ResumeSchema,
} from "../services/ai/schemas/ResumeSchema.ts";
import { parsePositionInfo } from "../services/ai/schemas/PositionInfoSchema.ts";
import { generateCoverLetter } from "../services/ai/prompts/CoverLetterPrompt.ts";
import {
  parseCoverLetter,
  CoverLetterSchema,
} from "../services/ai/schemas/CoverLetterSchema.ts";
import PositionController from "../controllers/PositionController.ts";
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const positionRouter = Router();

// List all positions
positionRouter.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const positions = await PositionTable.list();
      res.render("ListPositions", { positions });
    } catch (error) {
      next(error);
    }
  }
);

// Show create position form
positionRouter.get(
  "/new",
  async function (req: Request, res: Response, _next: NextFunction) {
    res.render("EditPosition", { mode: "create" });
  }
);

// Show edit position form
positionRouter.get(
  "/:id/edit",
  async function (req: Request, res: Response, _next: NextFunction) {
    const position = await PositionTable.getById(Number(req.params.id));

    if (!position) {
      res.status(404).send("Position not found");
      return;
    }

    res.render("EditPosition", { position, mode: "edit" });
  }
);

// Create new position
positionRouter.post(
  "/",
  async function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = await PositionController.create({
        description: req.body.description,
        url: req.body.url,
      });
      res.redirect(`/positions/${id}`);
    } catch (error) {
      next(error);
    }
  }
);

// View single position
positionRouter.get(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = await PositionTable.getById(Number(req.params.id));

      if (!position) {
        res.status(404).send("Position not found");
        return;
      }

      res.render("ViewPosition", { position });
    } catch (error) {
      next(error);
    }
  }
);

// Update position
positionRouter.post(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = req.body;

      await PositionTable.update(Number(req.params.id), position);
      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

// Delete position
positionRouter.post(
  "/:id/delete",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await PositionTable.update(Number(req.params.id), {
        status: POSITION_STATUS.ARCHIVED,
      });
      res.redirect("/positions");
    } catch (error) {
      next(error);
    }
  }
);

// Parse position
positionRouter.post(
  "/:id/parse",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = await PositionTable.getById(Number(req.params.id));

      if (!position) {
        res.status(404).send("Position not found");
        return;
      }

      const positionInfo = await parsePositionInfo({
        text: position.description,
      });

      await PositionTable.update(position.id, {
        title: positionInfo.title || undefined,
        company: positionInfo.company || undefined,
        location: positionInfo.location || undefined,
        salary: positionInfo.salary || undefined,
        skills: positionInfo.skills?.join(",") || undefined,
      });

      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

// Optimize resume
positionRouter.post(
  "/:id/optimize",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = await PositionTable.getById(Number(req.params.id));

      if (!position) {
        res.status(404).send("Position not found");
        return;
      }

      const userInfo = await UserInfoTable.getUserInfo(position.userId);

      if (!userInfo) {
        res.status(404).send("User not found");
        return;
      }

      const { optimizedResume } = await optimizeResume({
        resume: userInfo.resume,
        jobDescription: position.description,
      });

      await PositionTable.update(position.id, {
        optimizedResumeText: optimizedResume,
      });

      const resumeJson = await parseResume({ text: optimizedResume });

      await PositionTable.update(position.id, {
        optimizedResumeJson: JSON.stringify(resumeJson, null, 2),
      });

      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

// Create documents
positionRouter.post(
  "/:id/create-documents",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = await PositionTable.getById(Number(req.params.id));

      if (!position) {
        res.status(404).send("Position not found");
        return;
      }
      if (!position.optimizedResumeJson) {
        res.status(400).send("Resume is not optimized");
        ``;
        return;
      }
      if (!position.coverLetterJson) {
        res.status(400).send("Cover letter is not optimized");
        return;
      }

      const resume = JSON.parse(position.optimizedResumeJson);
      ResumeSchema.parse(resume);

      const coverLetter = JSON.parse(position.coverLetterJson);
      CoverLetterSchema.parse(coverLetter);

      const userInfo = await UserInfoTable.getUserInfo(position.userId);

      if (!userInfo) {
        res.status(404).send("User not found");
        return;
      }

      const documents = await createDocuments({
        position,
        resume,
        userInfo,
        coverLetter,
      });

      await PositionTable.update(position.id, {
        resumeUrl: documents.resumeUrl,
        coverLetterUrl: documents.coverLetterUrl,
      });

      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

// Create cover letter
positionRouter.post(
  "/:id/create-cover-letter",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = await PositionTable.getById(Number(req.params.id));

      if (!position || !position.optimizedResumeText) {
        res.status(404).send("Position or resume not found");
        return;
      }

      const { coverLetter } = await generateCoverLetter({
        resume: position.optimizedResumeText,
        jobDescription: position.description,
        additionalJoiningReasons: position.additionalJoiningReasons || "",
      });

      const coverLetterJson = await parseCoverLetter({ text: coverLetter });

      await PositionTable.update(position.id, {
        coverLetterText: coverLetter,
        coverLetterJson: JSON.stringify(coverLetterJson, null, 2),
      });

      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

export default positionRouter;
