import { userRepository } from "../sql/database.js";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/errors/customErrors.js";
import { validateUser } from "../utils/errors/validations/userValidation.js";

export const getAllUsers = async () => {
  return await userRepository.getAll();
};

export const getUserById = async (id) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }
  return user;
};

export const getUserWithArticles = async (id) => {
  const user = await userRepository.getByIdWithArticles(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }
  return user;
};

export const createUser = async (userData) => {
  validateUser(userData);
  const newUser = await userRepository.create(userData);
  return newUser;
};

export const updateUser = async (id, updatedData) => {
  if (!updatedData.name && !updatedData.email) {
    throw new BadRequestError("Aucun champ à mettre à jour");
  }
  const updatedUser = await userRepository.update(id, updatedData);
  if (!updatedUser) {
    throw new NotFoundError("Utilisateur non trouvé");
  }
  return updatedUser;
};

export const deleteUser = async (id) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }
  await userRepository.delete(id);
  return user;
};
