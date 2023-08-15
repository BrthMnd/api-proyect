const mongoose = require("mongoose");

class DatabaseConnector {
  connect() {
    mongoose.connect(
      "mongodb+srv://rcservicewebcontrol:rcservice2023@db.tpg4eln.mongodb.net/rcservice?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "*** connection error:"));
    db.once("open", () => {
      console.log("*** Connected to the database ***");
    });
  }

  close() {
    mongoose.disconnect();
    console.log("*** Connection to the db close ***");
  }
}

// Llamar a la función para conectarse a la base de datos
module.exports = { DatabaseConnector };
