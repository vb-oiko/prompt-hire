import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import PositionTable from "../tables/PositionTable.ts";
import { POSITION_STATUS } from "../tables/PositionTable.ts";
import { optimizeSummary } from "../services/ai/prompts/ResumeOptimizationPrompt.ts";
import { STRUCTURED_RESUME } from "../tables/UserInfoTable.ts";
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
      const id = await PositionController.createPosition({
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

      await PositionController.parsePositionInfo({
        positionId: position.id,
        positionDescription: position.description,
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
      await PositionController.tailorResume({
        positionId: Number(req.params.id),
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
      await PositionController.generateResumeAndCoverLetter({
        positionId: Number(req.params.id),
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
      await PositionController.tailorCoverLetter({
        positionId: Number(req.params.id),
      });

      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

// Parse position skills
positionRouter.post(
  "/:id/parse-skills",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await PositionController.parsePositionSkills({
        positionId: Number(req.params.id),
      });

      res.send(`
        <html>
          <body><pre>${JSON.stringify(skills, null, 2)}</pre></body>
        </html>
      `);
    } catch (error) {
      next(error);
    }
  }
);

// Optimize summary
positionRouter.post(
  "/:id/optimize-summary",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const position = await PositionTable.getById(Number(req.params.id));

      if (!position) {
        res.status(404).send("Position not found");
        return;
      }

      const { summary } = await optimizeSummary({
        resumeJson: STRUCTURED_RESUME,
        jobDescription: position.description,
      });

      res.send(`
        <html>
          <body><p>${summary}</p></body>
        </html>
      `);
    } catch (error) {
      next(error);
    }
  }
);

// Start tailoring workflow
positionRouter.post(
  "/:id/start-tailoring-workflow",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      PositionController.startTailoringWorkflow({
        positionId: Number(req.params.id),
      });

      res.redirect(`/positions/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);
export default positionRouter;
