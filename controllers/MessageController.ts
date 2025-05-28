import ContactTable from "../tables/ContactTable";
import MessageTable from "../tables/MessageTable";
import PositionTable from "../tables/PositionTable";

async function createConnectionRequestMessage(
  contactId: number,
  positionId: number
) {
  const position = await PositionTable.getById(positionId);

  if (!position) {
    throw new Error("Position not found");
  }

  const contact = await ContactTable.getById(contactId);

  if (!contact) {
    throw new Error("Contact not found");
  }

  await MessageTable.create({
    contactId,
    positionId,
    text: `Hi ${contact.firstName}, I recently applied for the ${position.title} role in your team. I'm really excited about this opportunity and would love to connect with you to learn more. Looking forward to being in touch!`,
    type: "linkedin_connection_request",
  });
}

const MessageController = {
  createConnectionRequestMessage,
};

export default MessageController;
