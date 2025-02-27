import * as articleController from "../controllers/articleController.js";
import { handleAsyncErrors } from "../utils/errors/errorHandler.js";

export const articleRoutes = {
  "GET /articles": handleAsyncErrors(articleController.getAllArticles),
  "POST /articles": handleAsyncErrors(articleController.addArticle),
  "GET /articles/:id": handleAsyncErrors(articleController.getArticleById),
  "PUT /articles/:id": handleAsyncErrors(articleController.updateArticle),
  "DELETE /articles/:id": handleAsyncErrors(articleController.deleteArticle),
};
