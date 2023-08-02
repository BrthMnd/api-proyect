const { MongoClient } = require("mongodb");

class DatabaseConnector {
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  constructor(options) {
    this.database = process.env.DATABASE_NAME;
    this.uri = process.env.DATABASE_URL;
    this.options = options;
    this.client = new MongoClient(this.uri, this.options);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Conexión exitosa a la base de datos");
      this.db = this.client.db(this.database);
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error;
    }
  }

  getCollection(collection) {
    if (!this.db) {
      throw new Error(
        "Debes conectar a la base de datos primero antes de acceder a las colecciones"
      );
    }
    return this.db.collection(collection);
  }

  async close() {
    await this.client.close;
    console.log("Conexión a la base de datos cerrada");
  }
}
// Llamar a la función para conectarse a la base de datos
module.exports = { DatabaseConnector };
