import { validateEmail, validateName } from "./filedsValidations/index.js";

export const validateUser = (user) => {
  if (!user) {
    throw new Error("Aucun utilisateur fourni.");
  }

  validateName(user.username);

  validateEmail(user.email);

  return true;
};
