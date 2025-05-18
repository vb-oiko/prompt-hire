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

// Define TypeScript interfaces for type safety
export interface Position {
  id: number;
  title: string;
  description: string;
  url: string;
  company: string;
  location?: string;
  salary?: string;
  tags?: string;
  status: PositionStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

async function create(position: Position): Promise<void> {
  await db.run(
    "INSERT INTO positions (title, description, url, company, location, salary, tags, status, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      position.title,
      position.description,
      position.url,
      position.company,
      position.location,
      position.salary,
      position.tags,
      position.status,
      position.userId,
      position.createdAt,
      position.updatedAt,
    ]
  );
}

async function list(): Promise<Position[]> {
  return await db.all("SELECT * FROM positions ORDER BY createdAt DESC");
}

async function getById(id: number): Promise<Position | undefined> {
  return await db.get("SELECT * FROM positions WHERE id = ?", [id]);
}

async function update(id: number, position: Partial<Position>): Promise<void> {
  await db.update(id, position);
}

const PositionTable = {
  create,
  list,
  getById,
  update,
};

export default PositionTable;
