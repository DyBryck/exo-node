import * as articleService from "../services/articleService.js";
import { handleRequest } from "../utils/controllerUtils.js";

export const getAllArticles = async (req, res) =>
  handleRequest(req, res, async () => {
    return await articleService.getAllArticles();
  });

export const getArticleById = async (req, res, id) =>
  handleRequest(req, res, async () => {
    return await articleService.getArticleById(id);
  });

export const addArticle = async (req, res) =>
  handleRequest(
    req,
    res,
    async (body) => {
      return await articleService.createArticle(body);
    },
    201,
  );

export const updateArticle = async (req, res, id) =>
  handleRequest(req, res, async (body) => {
    return await articleService.updateArticle(id, body);
  });

export const deleteArticle = async (req, res, id) =>
  handleRequest(req, res, async () => {
    const article = await articleService.deleteArticle(id);
    return {
      message: "Article supprimé avec succès",
      article,
    };
  });
