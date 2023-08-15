const mongoose = require("mongoose");
class DatabaseConnector {
  connect(req, res, next) {
    mongoose
      .connect(
        "mongodb+srv://rcservicewebcontrol:rcservice2023@db.tpg4eln.mongodb.net/rcservice?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("\n*** Conexión a la base de datos establecida. ***\n\n");
      })
      .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
        res.status(500).send({ error: "Error en el servidor" });
      })
      .finally(() => next()); // continuar con la solicitud
  }

  close(req, res, next) {
    try {
      mongoose.connection.close();
      console.log("Cerrado");
    } catch (error) {
      console.error("Error al cerrar la conexión a la base de datos:", error);
      res.status(500).send({ error: "Error en el servidor" });
    }
  }
}

// Llamar a la función para conectarse a la base de datos
module.exports = { DatabaseConnector };
