import * as articleController from "../controllers/articleController.js";

export const articleRoutes = {
  "GET /articles": articleController.getAllArticles,
  "POST /articles": articleController.addArticle,
  "GET /articles/:id": articleController.getArticleById,
  "PUT /articles/:id": articleController.updateArticle,
  "DELETE /articles/:id": articleController.deleteArticle,
};
