export function validateName(name) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Le nom est requis.");
  }
  if (name.length > 255) {
    throw new Error("Le nom doit contenir au maximum 255 caractères.");
  }
  return true;
}
