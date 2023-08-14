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
        next(); // Continuar con el manejo de la solicitud
      })
      .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
        res.status(500).json({ error: "Error en el servidor" });
      });
  }

  close(req, res, next) {
    try {
      mongoose.connection.close();
      console.log("Cerrado");
      next();
    } catch (error) {
      console.error("Error al cerrar la conexión a la base de datos:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}

// Llamar a la función para conectarse a la base de datos
module.exports = { DatabaseConnector };
