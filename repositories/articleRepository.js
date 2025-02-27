import { appendLog } from "../utils/logger.js";
import { Repository } from "./repository.js";

export class ArticleRepository extends Repository {
  async getAll() {
    return await this.db.all("SELECT * FROM articles;");
  }

  async getById(id) {
    return await this.db.get("SELECT * FROM articles WHERE id = ?", [id]);
  }

  async add(article) {
    const { title, content, user_id } = article;
    const result = await this.db.run(
      "INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, user_id],
    );
    if (!result.lastID) {
      throw new Error("Échec de l'insertion de l'article");
    }
    const insertedArticle = await this.getById(result.lastID);
    appendLog(`📌 Article ajouté: ${JSON.stringify(insertedArticle)}`);
    return insertedArticle;
  }

  async update(id, article) {
    const { title, content } = article;
    const result = await this.db.run(
      "UPDATE articles SET title = ?, content = ? WHERE id = ?",
      [title, content, id],
    );
    if (result.changes === 0) {
      throw new Error("Aucun article modifié.");
    }
    const updatedArticle = await this.getById(id);
    appendLog(`📌 Article mis à jour: ${JSON.stringify(updatedArticle)}`);
    return updatedArticle;
  }

  async delete(id) {
    const article = await this.getById(id);
    if (!article) {
      throw new Error("Article non trouvé.");
    }
    await this.db.run("DELETE FROM articles WHERE id = ?", [id]);
    appendLog(`📌 Article supprimé: ${JSON.stringify(article)}`);
    return article;
  }
}
