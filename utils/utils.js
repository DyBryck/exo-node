import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function connect(dbFile) {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database,
  });
  await db.run("PRAGMA foreign_keys = ON");
  return db;
}
