import sqlite3 from "sqlite3";
import { DB_FILE_PATH } from "../const.ts";
import { CREATE_POSITIONS_TABLE_STATEMENT } from "../tables/PositionTable.ts";

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
    db.run(CREATE_POSITIONS_TABLE_STATEMENT);
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

async function run(
  query: string,
  params: any[] = []
): Promise<sqlite3.RunResult> {
  return new Promise((resolve, reject) => {
    getConnection().run(query, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
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
