import { Router, Request, Response, NextFunction } from "express";
import MessageTable from "../tables/MessageTable";

const messageRouter = Router();

messageRouter.post(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    const message = await MessageTable.getById(Number(req.params.id));

    if (!message) {
      throw new Error("Message not found");
    }

    await MessageTable.update(message.id, { text: req.body.text });

    res.redirect(`/contacts/${message.contactId}`);
  }
);

export default messageRouter;
