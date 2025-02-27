import { ArticleRepository } from "../repositories/articleRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { DB_FILE } from "../utils/config.js";

const userRepository = await UserRepository.create(DB_FILE);
const articleRepository = await ArticleRepository.create(DB_FILE);

export { articleRepository, userRepository };
