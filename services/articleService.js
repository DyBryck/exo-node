import { articleRepository } from "../repositories/articleRepository.js";
import { validateArticle } from "../utils/errors/validations/articleValidation.js";

export const getAllArticles = async () => {
  return await articleRepository.getAll();
};

export const getArticleById = async (id) => {
  const article = await articleRepository.getById(id);
  if (!article) {
    throw { status: 404, message: "Article non trouvé" };
  }
  return article;
};

export const createArticle = async (articleData) => {
  validateArticle(articleData);

  const createdArticle = await articleRepository.add(articleData);
  return createdArticle;
};

export const updateArticle = async (id, articleData) => {
  validateArticle(articleData);

  const updatedArticle = await articleRepository.update(id, articleData);
  if (!updatedArticle) {
    throw { status: 404, message: "Article non trouvé" };
  }
  return updatedArticle;
};

export const deleteArticle = async (id) => {
  const article = await articleRepository.getById(id);
  if (!article) {
    throw { status: 404, message: "Article non trouvé" };
  }
  await articleRepository.delete(id);
  return article;
};
