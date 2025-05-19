import sqlite3 from "sqlite3";
import { DB_FILE_PATH } from "../const.ts";
import {
  POSITION_STATUSES,
  POSITION_STATUS,
  Position,
} from "../tables/PositionTable.ts";

let dbInstance: sqlite3.Database | null = null;

function getConnection(): sqlite3.Database {
  if (!dbInstance) {
    dbInstance = new sqlite3.Database(DB_FILE_PATH);
    initDb(dbInstance);
  }
  return dbInstance;
}

function initDb(db: sqlite3.Database): void {
  db.serialize(() => {
    // Enable foreign key support
    db.run("PRAGMA foreign_keys = ON");

    db.run(`
      CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT NOT NULL,
        url TEXT NOT NULL,
        company TEXT,
        location TEXT,
        salary TEXT,
        tags TEXT,
        status TEXT NOT NULL CHECK(status IN (${POSITION_STATUSES.map((status) => `'${status}'`).join(",")})) DEFAULT ${POSITION_STATUS.NEW},
        userId INTEGER NOT NULL,
        optimizedResume TEXT,
        resumeUrl TEXT,
        coverLetterUrl TEXT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create indexes for common queries
      CREATE INDEX IF NOT EXISTS idx_positions_userId ON positions(userId);
      CREATE INDEX IF NOT EXISTS idx_positions_status ON positions(status);
      CREATE INDEX IF NOT EXISTS idx_positions_company ON positions(company);
      CREATE INDEX IF NOT EXISTS idx_positions_created ON positions(createdAt);
    `);

    // Create a trigger to automatically update the updatedAt timestamp
    db.run(`
      CREATE TRIGGER IF NOT EXISTS update_positions_timestamp 
      AFTER UPDATE ON positions
      BEGIN
        UPDATE positions SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);
  });
}

async function all<T>(query: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    getConnection().all(query, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows as T[]);
    });
  });
}

async function get<T>(
  query: string,
  params: any[] = []
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    getConnection().get(query, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row as T);
    });
  });
}

async function run(query: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    getConnection().run(query, params, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

async function update<T extends Record<string, any>>(
  id: number,
  updates: Partial<T>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      console.warn("No fields to update", id, updates);
      return;
    }

    const values = fields.map((field) => updates[field]);

    getConnection().run(
      `UPDATE positions SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE id = ?`,
      [...values, id],
      (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
}

export const db = {
  all,
  get,
  run,
  update,
};
