import * as userController from "../controllers/userController.js";

export const userRoutes = {
  "GET /users": userController.listUsers,
  "POST /users": userController.createUser,
  "GET /users/:id": userController.getUserById,
  "GET /users/:id/articles": userController.getUserWithArticles,
  "PUT /users/:id": userController.updateUser,
  "DELETE /users/:id": userController.deleteUser,
};
