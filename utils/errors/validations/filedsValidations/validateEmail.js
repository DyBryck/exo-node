export function validateEmail(email) {
  if (typeof email !== "string" || email.trim() === "") {
    throw new Error("L'adresse email est requise.");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Adresse email invalide.");
  }
  if (email.length > 255) {
    throw new Error("L'adresse email doit contenir au maximum 255 caractères.");
  }
  return true;
}
