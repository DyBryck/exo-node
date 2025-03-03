import * as articleService from "../services/articleService.js";
import { handleRequest } from "../utils/controllerUtils.js";

export const getAllArticles = async (req, res) =>
  handleRequest(req, res, async () => {
    return await articleService.getAllArticles();
  });

export const getArticleById = async (req, res) =>
  handleRequest(req, res, async () => {
    const id = req.params.id;
    const articleFound = await articleService.getArticleById(id);
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

export const updateArticle = async (req, res) =>
  handleRequest(req, res, async (body) => {
    const id = req.params.id;
    const articleUpdated = await articleService.updateArticle(id, body);
    return {
      message: "Article modifié:",
      article: articleUpdated,
    };
  });

export const deleteArticle = async (req, res) =>
  handleRequest(req, res, async () => {
    const id = req.params.id;
    const articleDeleted = await articleService.deleteArticle(id);
    return {
      message: "Article supprimé:",
      article: articleDeleted,
    };
  });
