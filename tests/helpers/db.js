import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CLEAN_DB_FILE = path.join(__dirname, "..", "..", "sql", "cleanSchema.sqlite");
export const TEST_DB_FILE = path.join(__dirname, "..", "..", "sql", "test.sqlite");

export const resetDatabase = async () => {
  fs.copyFileSync(CLEAN_DB_FILE, TEST_DB_FILE);
};
