import * as userService from "../services/userService.js";
import { handleRequest } from "../utils/controllerUtils.js";

export const listUsers = async (req, res) =>
  handleRequest(req, res, async () => {
    return await userService.listUsers();
  });

export const createUser = async (req, res) =>
  handleRequest(
    req,
    res,
    async (body) => {
      return await userService.createUser(body);
    },
    201,
  );

export const getUserById = async (req, res, id) =>
  handleRequest(req, res, async () => {
    return await userService.getUserById(id);
  });

export const getUserWithArticles = async (req, res, id) =>
  handleRequest(req, res, async () => {
    return await userService.getUserWithArticles(id);
  });

export const updateUser = async (req, res, id) =>
  handleRequest(req, res, async (body) => {
    return await userService.updateUser(id, body);
  });

export const deleteUser = async (req, res, id) =>
  handleRequest(req, res, async () => {
    const deletedUser = await userService.deleteUser(id);
    return {
      message: "Utilisateur supprimé avec succès",
      user: deletedUser,
    };
  });
