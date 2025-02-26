import { appendLog } from "../utils/logger.js";
import { connect } from "../utils/utils.js";

class ArticleRepository {
  constructor(dbFile) {
    this.dbFile = dbFile;
    this.db = null;
  }

  async connect() {
    try {
      this.db = await connect(this.dbFile);
      console.log("Connexion à SQLite réussie !");
    } catch (error) {
      console.error("Erreur de connexion à SQLite :", error);
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.db.all("SELECT * FROM articles;");
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.db.get("SELECT * FROM articles WHERE id = ?", [id]);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article :", error);
      throw error;
    }
  }

  async add(article) {
    try {
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
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      throw error;
    }
  }

  async update(id, article) {
    try {
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
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const article = await this.getById(id);
      if (!article) {
        throw new Error("Article non trouvé.");
      }
      await this.db.run("DELETE FROM articles WHERE id = ?", [id]);
      appendLog(`📌 Article supprimé: ${JSON.stringify(article)}`);
      return article;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      throw error;
    }
  }
}

const articleRepository = new ArticleRepository("../sql/schema.sqlite");

(async () => {
  try {
    await articleRepository.connect();
  } catch (error) {
    console.error("Erreur lors de la connexion initiale :", error);
  }
})();

export { articleRepository };
