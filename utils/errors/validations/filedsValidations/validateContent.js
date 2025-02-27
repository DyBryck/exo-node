export function validateContent(content) {
  if (content === undefined) {
    throw new Error("Le contenu est requis");
  } else if (typeof content !== "string") {
    throw new Error("Le contenu n'est pas de type String");
  } else if (content.trim() === "") {
    throw new Error("Le contenu est vide.");
  }

  if (content.length > 5000) {
    throw new Error("Le contenu doit contenir au maximum 5000 caractères.");
  }
  return true;
}
