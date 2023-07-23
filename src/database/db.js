const { MongoClient } = require("mongodb");

async function connectDB(collection) {
  const Db = "rcservice";
  const uri =
    "mongodb+srv://rcservicewebcontrol:rcservice2023@db.tpg4eln.mongodb.net/?retryWrites=true&w=majority";

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(uri, options);
  try {
    // Conectar a la base de datos
    await client.connect();
    console.log("Conexión exitosa a la base de datos");
    return client.db(Db).collection(collection);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

// Llamar a la función para conectarse a la base de datos
module.exports = { connectDB };
