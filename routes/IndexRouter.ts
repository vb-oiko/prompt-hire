import { Router } from "express";
import positionsRouter from "./PositionRouter.ts";

const indexRouter = Router();

indexRouter.get("/", async function (req, res, _next) {
  res.render("HomeView");
});

indexRouter.use("/positions", positionsRouter);

export default indexRouter;
