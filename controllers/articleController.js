import * as articleService from "../services/articleService.js";
import { handleRequest } from "../utils/controllerUtils.js";

export const findAllArticles = async (req, res) =>
  handleRequest(req, res, async () => {
    return await articleService.findAllArticles();
  });

export const findArticleById = async (req, res, id) =>
  handleRequest(req, res, async () => {
    const articleFound = await articleService.findArticleById(id);
    return {
      message: "Article trouvé:",
      article: articleFound,
    };
  });

export const createArticle = async (req, res) =>
  handleRequest(req, res, async (body) => {
    const articleAdded = await articleService.createArticle(body);
    return {
      message: "Article ajouté:",
      article: articleAdded,
    };
  });

export const updateArticle = async (req, res, id) =>
  handleRequest(req, res, async (body) => {
    const articleUpdated = await articleService.updateArticle(id, body);
    return {
      message: "Article modifié:",
      article: articleUpdated,
    };
  });

export const deleteArticle = async (req, res, id) =>
  handleRequest(req, res, async () => {
    const articleDeleted = await articleService.deleteArticle(id);
    return {
      message: "Article supprimé:",
      article: articleDeleted,
    };
  });
