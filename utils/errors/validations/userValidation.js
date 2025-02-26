import { validateEmail, validateName } from "./filedsValidations/index.js";

export function validateUser(user) {
  if (!user) {
    throw new Error("Aucun utilisateur fourni.");
  }

  validateName(user.name);

  validateEmail(user.email);

  return true;
}
