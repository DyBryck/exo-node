import { userRepository } from "../sql/database.js";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/errors/customErrors.js";
import { validateUser } from "../utils/errors/validations/userValidation.js";

export const findAllUsers = async () => {
  return await userRepository.findAll();
};

export const findUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }
  return user;
};

export const findUserWithArticles = async (id) => {
  const user = await userRepository.findByIdWithArticles(id);
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
  const user = await userRepository.findById(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }
  await userRepository.delete(id);
  return user;
};
