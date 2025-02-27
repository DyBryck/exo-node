import path from "path";
import { fileURLToPath } from "url";
import { UserRepository } from "../repositories/userRepository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DB_FILE = path.join(__dirname, "..", "sql", "schema.test.sqlite");

const userRepositoryTest = await UserRepository.create(TEST_DB_FILE);

export { userRepositoryTest };
