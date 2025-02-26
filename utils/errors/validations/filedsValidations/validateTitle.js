export function validateTitle(title) {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Le titre est requis.");
  }
  if (title.length > 50) {
    throw new Error("Le titre doit contenir au maximum 50 caractères.");
  }
  return true;
}
