import { Router } from "express";
import positionsRouter from "./PositionRouter.ts";
import contactsRouter from "./ContactRoutes.ts";
import messageRouter from "./MessageRoutes.ts";

const indexRouter = Router();

indexRouter.get("/", async function (req, res, _next) {
  res.render("HomeView");
});

indexRouter.use("/positions", positionsRouter);
indexRouter.use("/contacts", contactsRouter);
indexRouter.use("/messages", messageRouter);

export default indexRouter;
