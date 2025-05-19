import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import PositionTable, { Position } from "../tables/PositionTable.ts";
import { POSITION_STATUS } from "../tables/PositionTable.ts";
import { extractPositionInfo } from "../services/ai/prompts/ExtractPositionInfoPrompt.ts";
import {
  optimizeResume,
  ResumeSchema,
} from "../services/ai/prompts/ResumeOptimizationPrompt.ts";
import UserInfoTable from "../tables/UserInfoTable.ts";
import { createDocuments } from "../services/GDocService.ts";
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
      res.render("PositionsView", { positions });
    } catch (error) {
      next(error);
    }
  }
);

// Show create position form
positionRouter.get(
  "/new",
  async function (req: Request, res: Response, _next: NextFunction) {
    res.render("PositionView", { mode: "create" });
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
      const positionInfo = await extractPositionInfo({
        description: req.body.description,
      });

      const position: Position = {
        ...req.body,
        status: POSITION_STATUS.NEW,
        userId: req.user?.id || 1, // TODO: Replace with actual user ID from session
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...positionInfo,
      };

      await PositionTable.create(position);
      res.redirect("/positions");
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

      res.render("PositionView", { position, mode: "edit" });
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
      res.redirect(`/positions`);
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

      const positionInfo = await extractPositionInfo({
        description: position.description,
      });

      await PositionTable.update(position.id, {
        title: positionInfo.title || undefined,
        company: positionInfo.company || undefined,
        location: positionInfo.location || undefined,
        salary: positionInfo.salary || undefined,
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

      const resume = await optimizeResume({
        resume: userInfo.resume,
        jobDescription: position.description,
      });

      await PositionTable.update(position.id, {
        optimizedResume: JSON.stringify(resume, null, 2),
      });

      res.redirect(`/positions`);
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
      if (!position.optimizedResume) {
        res.status(400).send("Resume is not optimized");
        return;
      }

      const resume = JSON.parse(position.optimizedResume);
      console.dir(resume, { depth: null });
      ResumeSchema.parse(resume);

      const documents = await createDocuments(position.company, resume);

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

export default positionRouter;
