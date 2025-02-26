import { validateContent, validateTitle } from "./filedsValidations/index.js";

export function validateArticle(article) {
  if (!article) {
    throw new Error("Aucun article fourni.");
  }

  validateTitle(article.title);

  validateContent(article.content);

  if (!article.user_id) {
    throw new Error("L'identifiant de l'utilisateur (user_id) est requis.");
  }

  return true;
}
