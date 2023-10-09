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
        res.status(500).send({ error: "Error en el servidor", Type: error });
      })
      .finally(() => next()); // continuar con la solicitud
  }

  close(req, res, next) {
    mongoose.connection
      .close()
      .then(() => console.log("*** Cerrando ***"))
      .catch((e) => {
        console.error("Error al cerrar la conexión a la base de datos:", error);
        res
          .status(500)
          .send({ error: "Error en el servidor ->", type: e.message });
      });
  }
}

// Llamar a la función para conectarse a la base de datos
module.exports = { DatabaseConnector };
