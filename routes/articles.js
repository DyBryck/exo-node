import * as articleController from "../controllers/articleController.js";
import { handleAsyncErrors } from "../utils/errors/errorHandler.js";

export const articleRoutes = {
  "GET /articles": handleAsyncErrors(articleController.findAllArticles),
  "GET /articles/:id": handleAsyncErrors(articleController.findArticleById),
  "POST /articles": handleAsyncErrors(articleController.createArticle),
  "PUT /articles/:id": handleAsyncErrors(articleController.updateArticle),
  "DELETE /articles/:id": handleAsyncErrors(articleController.deleteArticle),
};
