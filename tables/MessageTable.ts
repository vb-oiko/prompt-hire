import { db } from "../db/index.ts";

export const CREATE_MESSAGES_TABLE_STATEMENT = `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        contactId INTEGER NOT NULL,
        positionId INTEGER NOT NULL,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create indexes for common queries
      CREATE INDEX IF NOT EXISTS idx_messages_contactId ON messages(contactId);
      CREATE INDEX IF NOT EXISTS idx_messages_positionId ON messages(positionId);
      CREATE INDEX IF NOT EXISTS idx_messages_createdAt ON messages(createdAt);
    `;

export const MESSAGE_TYPE = {
  LINKEDIN_CONNECTION_REQUEST: "linkedin_connection_request",
  LINKEDIN_FOLLOW_UP: "linkedin_follow_up",
} as const;

export const MESSAGE_TYPE_LABELS = {
  [MESSAGE_TYPE.LINKEDIN_CONNECTION_REQUEST]:
    "LinkedIn Hiring Manager Connection Request",
  [MESSAGE_TYPE.LINKEDIN_FOLLOW_UP]: "LinkedIn Hiring Manager Follow Up",
} as const;

export const MESSAGE_TYPES = [
  MESSAGE_TYPE.LINKEDIN_CONNECTION_REQUEST,
  MESSAGE_TYPE.LINKEDIN_FOLLOW_UP,
] as const;

export type MessageType = (typeof MESSAGE_TYPES)[number];

// Define TypeScript interfaces for type safety
export interface Message {
  id: number;
  contactId: number;
  positionId: number;
  text: string;
  type: MessageType;
  createdAt: string;
  updatedAt: string;
}

async function create(
  message: Omit<Message, "id" | "createdAt" | "updatedAt">
): Promise<number> {
  const result = await db.run(
    "INSERT INTO messages (contactId, positionId, text, type) VALUES (?, ?, ?, ?)",
    [message.contactId, message.positionId, message.text, message.type]
  );

  if (result.lastID) {
    return result.lastID;
  }

  throw new Error("Failed to create message");
}

async function listByContactId(contactId: number): Promise<Message[]> {
  return await db.all(
    `SELECT * FROM messages WHERE contactId = ? ORDER BY createdAt DESC`,
    [contactId]
  );
}

async function getById(id: number): Promise<Message | undefined> {
  return await db.get("SELECT * FROM messages WHERE id = ?", [id]);
}

async function update(id: number, message: Partial<Message>): Promise<void> {
  await db.update("messages", id, message);
}

const MessageTable = {
  create,
  listByContactId,
  getById,
  update,
};

export default MessageTable;
