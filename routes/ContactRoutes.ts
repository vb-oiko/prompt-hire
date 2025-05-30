import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import ContactTable from "../tables/ContactTable.ts";
import MessageTable from "../tables/MessageTable.ts";
import MessageController from "../controllers/MessageController.ts";
import PositionTable from "../tables/PositionTable.ts";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const contactRouter = Router();

// List all contacts
contactRouter.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const positionId = req.query.positionId
        ? Number(req.query.positionId)
        : undefined;

      const search = req.query.search ? String(req.query.search) : undefined;

      const contacts = await ContactTable.list({
        positionId,
        search,
      });

      if (positionId) {
        const position = await PositionTable.getById(positionId);
        if (!position) {
          throw new Error("Position not found");
        }

        res.render("ListContacts", {
          contacts,
          position,
          search,
        });

        return;
      }

      res.render("ListContacts", { contacts, search });
    } catch (error) {
      next(error);
    }
  }
);

// render the new contact form
contactRouter.get(
  "/new",
  async function (req: Request, res: Response, next: NextFunction) {
    const positionId = req.query.positionId
      ? Number(req.query.positionId)
      : undefined;

    if (!positionId) {
      throw new Error("Position ID is required");
    }

    res.render("EditContact", { contact: {}, mode: "create", positionId });
  }
);

// Create a new contact
contactRouter.post(
  "/new",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, linkedin, positionId } = req.body;

      const [firstName, lastName] = fullName.split(" ");

      const contactId = await ContactTable.create({
        firstName,
        lastName,
        linkedin,
        positionId,
      });

      await MessageController.createConnectionRequestMessage(
        contactId,
        positionId
      );

      res.redirect(`/contacts/?positionId=${positionId}`);
    } catch (error) {
      next(error);
    }
  }
);

// Update a contact
contactRouter.post(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await ContactTable.update(Number(req.params.id), req.body);

      res.redirect(`/contacts/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

// View a contact
contactRouter.get(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    const contact = await ContactTable.getById(Number(req.params.id));

    if (!contact) {
      throw new Error("Contact not found");
    }

    const messages = await MessageTable.listByContactId(contact.id);
    res.render("ViewContact", { contact, messages });
  }
);

// generate a linkedin connection request message
contactRouter.post(
  "/:id/generate-linkedin-connection-request-message",
  async function (req: Request, res: Response, next: NextFunction) {
    const contact = await ContactTable.getById(Number(req.params.id));

    if (!contact) {
      throw new Error("Contact not found");
    }

    await MessageController.createConnectionRequestMessage(
      contact.id,
      contact.positionId
    );

    res.redirect(`/contacts/${contact.id}`);
  }
);

export default contactRouter;
