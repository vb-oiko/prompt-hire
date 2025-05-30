import { db } from "../db/index.ts";

export const CREATE_CONTACTS_TABLE_STATEMENT = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        linkedin TEXT,
        positionId INTEGER NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create indexes for common queries
      CREATE INDEX IF NOT EXISTS idx_contacts_positionId ON contacts(positionId);
      CREATE INDEX IF NOT EXISTS idx_contacts_createdAt ON contacts(createdAt);
    `;

// Define TypeScript interfaces for type safety
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  linkedin: string;
  positionId: number;
  createdAt: string;
  updatedAt: string;
}

async function create(
  contact: Omit<Contact, "id" | "createdAt" | "updatedAt">
): Promise<number> {
  const result = await db.run(
    "INSERT INTO contacts (firstName, lastName, linkedin, positionId) VALUES (?, ?, ?, ?)",
    [contact.firstName, contact.lastName, contact.linkedin, contact.positionId]
  );

  if (result.lastID) {
    return result.lastID;
  }

  throw new Error("Failed to create contact");
}

async function list({
  positionId,
  search,
}: {
  positionId?: number;
  search?: string;
}): Promise<Contact[]> {
  let query = `
    SELECT contacts.*, positions.title as positionTitle, positions.company as positionCompany
    FROM contacts
    LEFT JOIN positions ON contacts.positionId = positions.id
    WHERE 1=1
  `;

  const params: any[] = [];

  if (positionId) {
    query += ` AND positionId = ?`;
    params.push(positionId);
  }
  if (search) {
    query += ` AND (firstName LIKE ? OR lastName LIKE ? OR positionCompany LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  return await db.all(query, params);
}

async function listByPositionId(positionId: number): Promise<Contact[]> {
  return await db.all(
    `SELECT * FROM contacts WHERE positionId = ? ORDER BY createdAt DESC`,
    [positionId]
  );
}

async function getById(id: number): Promise<Contact | undefined> {
  return await db.get(
    `SELECT contacts.*, positions.title as positionTitle, positions.company as positionCompany
    FROM contacts
    LEFT JOIN positions ON contacts.positionId = positions.id
    WHERE contacts.id = ?`,
    [id]
  );
}

async function update(id: number, contact: Partial<Contact>): Promise<void> {
  await db.update("contacts", id, contact);
}

const ContactTable = {
  create,
  list,
  listByPositionId,
  getById,
  update,
};

export default ContactTable;
