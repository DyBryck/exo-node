import { appendLog } from "../utils/logger.js";
import { connect } from "../utils/utils.js";

class UserDatabase {
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

  validateUserData(user) {
    const { name, email } = user;
    if (!name || !email) {
      throw new Error("Données invalides : name et email sont requis.");
    }
    if (name.length > 255) {
      throw new Error("Nom trop long (max 255 caractères).");
    }
    if (email.length > 255) {
      throw new Error("Email trop long (max 255 caractères).");
    }
  }

  async create(user) {
    try {
      this.validateUserData(user);
      const { name, email } = user;
      const result = await this.db.run(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
      );
      const newUser = await this.getById(result.lastID);
      appendLog(`Nouvel utilisateur ajouté: ${JSON.stringify(newUser)}`);
      return newUser;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      return null;
    }
  }

  async list() {
    try {
      return await this.db.all("SELECT * FROM users;");
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      return [];
    }
  }

  async getById(id) {
    try {
      return await this.db.get("SELECT * FROM users WHERE id = ?", [id]);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      return null;
    }
  }

  async getUserWithArticles(id) {
    try {
      const user = await this.getById(id);
      if (!user) return null;

      const articles = await this.db.all(
        "SELECT * FROM articles WHERE user_id = ?",
        [id],
      );

      user.articles = articles;
      return user;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur et de ses articles :",
        error,
      );
      return null;
    }
  }

  async update(id, updatedUser) {
    try {
      if (!updatedUser.name && !updatedUser.email) {
        throw new Error("Aucun champ à mettre à jour.");
      }

      const queryParts = [];
      const params = [];

      if (updatedUser.name) {
        queryParts.push("name = ?");
        params.push(updatedUser.name);
      }

      if (updatedUser.email) {
        queryParts.push("email = ?");
        params.push(updatedUser.email);
      }

      const query = `UPDATE users SET ${queryParts.join(", ")} WHERE id = ?`;
      params.push(id);

      const result = await this.db.run(query, params);

      if (result.changes === 0) {
        throw new Error("Aucun utilisateur modifié.");
      }

      const user = await this.getById(id);
      appendLog(`Utilisateur mis à jour: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      return null;
    }
  }

  async delete(id) {
    try {
      const user = await this.getById(id);
      if (!user) return null;
      await this.db.run("DELETE FROM users WHERE id = ?", [id]);
      appendLog(`Utilisateur supprimé: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      return null;
    }
  }
}

const userRepository = new UserDatabase("../sql/schema.sqlite");

(async () => {
  try {
    await userDB.connect();
  } catch (error) {
    console.error("Erreur lors de la connexion initiale :", error);
  }
})();

export { userRepository };
