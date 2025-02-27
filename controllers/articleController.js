import * as articleService from "../services/articleService.js";
import { handleRequest } from "../utils/controllerUtils.js";

export const getAllArticles = async (req, res) =>
  handleRequest(req, res, async () => {
    return await articleService.getAllArticles();
  });

export const addArticle = async (req, res) =>
  handleRequest(req, res, async (body) => {
    const articleAdded = await articleService.createArticle(body);
    return {
      message: "Article ajouté:",
      article: articleAdded,
    };
  });

export const getArticleById = async (req, res, id) =>
  handleRequest(req, res, async () => {
    const articleFound = await articleService.getArticleById(id);
    return {
      message: "Article trouvé:",
      article: articleFound,
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
