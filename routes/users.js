import * as userController from "../controllers/userController.js";
import { handleAsyncErrors } from "../utils/errors/errorHandler.js";

export const userRoutes = {
  "GET /users": handleAsyncErrors(userController.listUsers),
  "POST /users": handleAsyncErrors(userController.createUser),
  "GET /users/:id": handleAsyncErrors(userController.getUserById),
  "GET /users/:id/articles": handleAsyncErrors(
    userController.getUserWithArticles,
  ),
  "PUT /users/:id": handleAsyncErrors(userController.updateUser),
  "DELETE /users/:id": handleAsyncErrors(userController.deleteUser),
};
