import { db } from "../db/index.ts";

export const POSITION_STATUS = {
  NEW: "new",
  PARSED: "parsed",
  APPLIED: "applied",
  ARCHIVED: "archived",
} as const;

export const POSITION_STATUSES = [
  POSITION_STATUS.NEW,
  POSITION_STATUS.PARSED,
  POSITION_STATUS.APPLIED,
  POSITION_STATUS.ARCHIVED,
] as const;

export type PositionStatus = (typeof POSITION_STATUSES)[number];

export const CREATE_POSITIONS_TABLE_STATEMENT = `
      CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT NOT NULL,
        url TEXT NOT NULL,
        company TEXT,
        location TEXT,
        salary TEXT,
        skills TEXT,
        tags TEXT,
        status TEXT NOT NULL CHECK(status IN (${POSITION_STATUSES.map((status) => `'${status}'`).join(",")})) DEFAULT ${POSITION_STATUS.NEW},
        userId INTEGER NOT NULL DEFAULT 0,
        optimizedResumeText TEXT,
        optimizedResumeJson TEXT,
        coverLetterText TEXT,
        coverLetterJson TEXT,
        resumeUrl TEXT,
        coverLetterUrl TEXT,
        additionalJoiningReasons TEXT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create indexes for common queries
      -- CREATE INDEX IF NOT EXISTS idx_positions_userId ON positions(userId);
      CREATE INDEX IF NOT EXISTS idx_positions_status ON positions(status);
      ---CREATE INDEX IF NOT EXISTS idx_positions_company ON positions(company);
      CREATE INDEX IF NOT EXISTS idx_positions_created ON positions(createdAt);
    `;

// Define TypeScript interfaces for type safety
export interface Position {
  id: number;
  title: string;
  description: string;
  url: string;
  company: string;
  location?: string;
  salary?: string;
  skills?: string;
  tags?: string;
  status: PositionStatus;
  userId: number;
  optimizedResumeText?: string;
  optimizedResumeJson?: string;
  coverLetterText?: string;
  coverLetterJson?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  additionalJoiningReasons?: string;
  createdAt: string;
  updatedAt: string;
}

async function create(position: Omit<Position, "id">): Promise<number> {
  const result = await db.run(
    "INSERT INTO positions ( description, url) VALUES (?, ?)",
    [position.description, position.url]
  );

  if (result.lastID) {
    return result.lastID;
  }

  throw new Error("Failed to create position");
}

async function list(): Promise<Position[]> {
  return await db.all(
    `SELECT * FROM positions WHERE status != ? ORDER BY createdAt DESC`,
    [POSITION_STATUS.ARCHIVED]
  );
}

async function getById(id: number): Promise<Position | undefined> {
  return await db.get("SELECT * FROM positions WHERE id = ?", [id]);
}

async function update(id: number, position: Partial<Position>): Promise<void> {
  await db.update("positions", id, position);
}

const PositionTable = {
  create,
  list,
  getById,
  update,
};

export default PositionTable;
