import { connect } from "../utils/utils.js";

export class Repository {
  constructor(dbFile) {
    this.dbFile = dbFile;
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      this.db = await connect(this.dbFile);
      console.log(`Connexion à SQLite réussie pour ${this.constructor.name}`);
    }
    return this.db;
  }

  static async create(dbFile) {
    const instance = new this(dbFile);
    await instance.connect();
    return instance;
  }
}
