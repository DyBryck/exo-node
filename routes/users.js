import * as userController from "../controllers/userController.js";
import { handleAsyncErrors } from "../utils/errors/errorHandler.js";

export const userRoutes = {
  "GET /users": handleAsyncErrors(userController.findAllUsers),
  "GET /users/:id": handleAsyncErrors(userController.findUserById),
  "GET /users/:id/articles": handleAsyncErrors(
    userController.findUserWithArticles,
  ),
  "POST /users": handleAsyncErrors(userController.createUser),
  "PUT /users/:id": handleAsyncErrors(userController.updateUser),
  "DELETE /users/:id": handleAsyncErrors(userController.deleteUser),
};
