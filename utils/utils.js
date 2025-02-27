import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const connect = async (dbFile) => {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database,
  });
  await db.run("PRAGMA foreign_keys = ON");
  return db;
};
