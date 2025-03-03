import express from "express";
import * as articleController from "../controllers/articleController.js";
import * as userController from "../controllers/userController.js";
import { handleAsyncErrors } from "../utils/errors/errorHandler.js";

const router = express.Router();

const articlesRouter = express.Router();

articlesRouter.get("/", handleAsyncErrors(articleController.getAllArticles));
articlesRouter.get("/:id", handleAsyncErrors(articleController.getArticleById));
articlesRouter.post("/", handleAsyncErrors(articleController.createArticle));
articlesRouter.put("/:id", handleAsyncErrors(articleController.updateArticle));
articlesRouter.delete("/:id", handleAsyncErrors(articleController.deleteArticle));

const usersRouter = express.Router();

usersRouter.get("/", handleAsyncErrors(userController.getAllUsers));
usersRouter.get("/:id", handleAsyncErrors(userController.getUserById));
usersRouter.get("/:id/articles", handleAsyncErrors(userController.getUserWithArticles));
usersRouter.post("/", handleAsyncErrors(userController.createUser));
usersRouter.put("/:id", handleAsyncErrors(userController.updateUser));
usersRouter.delete("/:id", handleAsyncErrors(userController.deleteUser));

router.use("/articles", articlesRouter);
router.use("/users", usersRouter);

export default router;
