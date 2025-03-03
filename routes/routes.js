import express from "express";
import * as articleController from "../controllers/articleController.js";
import * as userController from "../controllers/userController.js";
import { handleAsyncErrors } from "../utils/errors/errorHandler.js";

const router = express.Router();

// Articles
router.get("/articles", handleAsyncErrors(articleController.getAllArticles));
router.get(
  "/articles/:id",
  handleAsyncErrors(articleController.getArticleById),
);
router.post("/articles", handleAsyncErrors(articleController.createArticle));
router.put("/articles/:id", handleAsyncErrors(articleController.updateArticle));
router.delete(
  "/articles/:id",
  handleAsyncErrors(articleController.deleteArticle),
);

// Users
router.get("/users", handleAsyncErrors(userController.getAllUsers));
router.get("/users/:id", handleAsyncErrors(userController.getUserById));
router.get(
  "/users/:id/articles",
  handleAsyncErrors(userController.getUserWithArticles),
);
router.post("/users", handleAsyncErrors(userController.createUser));
router.put("/users/:id", handleAsyncErrors(userController.updateUser));
router.delete("/users/:id", handleAsyncErrors(userController.deleteUser));

export default router;
