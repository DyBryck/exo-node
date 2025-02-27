import { appendLog } from "../utils/logger.js";
import { Repository } from "./repository.js";

class UserRepository extends Repository {
  async create(user) {
    const { name, email } = user;
    const result = await this.db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
    );
    const newUser = await this.getById(result.lastID);
    appendLog(`Nouvel utilisateur ajouté: ${JSON.stringify(newUser)}`);
    return newUser;
  }

  async list() {
    return await this.db.all("SELECT * FROM users;");
  }

  async getById(id) {
    return await this.db.get("SELECT * FROM users WHERE id = ?", [id]);
  }

  async getUserWithArticles(id) {
    const user = await this.getById(id);
    if (!user) return null;

    const articles = await this.db.all(
      "SELECT * FROM articles WHERE user_id = ?",
      [id],
    );

    user.articles = articles;
    return user;
  }

  async update(id, updatedUser) {
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
  }

  async delete(id) {
    const user = await this.getById(id);
    if (!user) return null;
    await this.db.run("DELETE FROM users WHERE id = ?", [id]);
    appendLog(`Utilisateur supprimé: ${JSON.stringify(user)}`);
    return user;
  }
}

export { UserRepository };
