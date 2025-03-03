import User from "../models/users.js";
import { appendLog } from "../utils/logger.js";
import { Repository } from "./repository.js";

class UserRepository extends Repository {
  async getAll() {
    return await User.find({});
  }

  async getById(id) {
    return await User.findOne({ user_id: id });
  }

  async getByIdWithArticles(id) {
    const user = await this.getById(id);

    const articles = await this.db.all(
      "SELECT * FROM articles WHERE user_id = ?",
      [id],
    );

    const userObject = user.toObject();
    userObject.articles = articles;
    return userObject;
  }

  async create(user) {
    const { username, email } = user;
    const newUser = await User.create({ username, email });

    appendLog(`Utilisateur ajouté: ${JSON.stringify(newUser)}`);
    return newUser;
  }

  async update(id, updatedUser) {
    const user = await User.findOneAndUpdate({ user_id: id }, updatedUser, {
      new: true,
    });
    appendLog(`Utilisateur mis à jour: ${JSON.stringify(user)}`);
    return user;
  }

  async delete(id) {
    const user = await User.findOneAndDelete({ user_id: id });
    appendLog(`Utilisateur supprimé: ${JSON.stringify(user)}`);
    return user;
  }
}

export { UserRepository };
