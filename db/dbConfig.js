const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MG_DATABASE_LINK;
class DatabaseConnector {
  connect(req, res, next) {
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("***Conexión establecida.***");
      })
      .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
        res.status(500).send({ error: "Error en el servidor" });
      })
      .finally(() => {
        try {
          next();
        } catch (error) {
          console.log("no se puede continuar con la solicitud");
        }
      }); // continuar con la solicitud
  }
  close(req, res, next) {
    mongoose.connection
      .close()
      .then(() => console.log("*** Cerrando ***"))
      .catch((e) => {
        console.error("Error al cerrar la conexión a la base de datos:", error);
        res.status(500).send({ error: "Error en el servidor" });
      });
  }
}

module.exports = {
  DatabaseConnector,

  User: require("../models/User"),
  Role: require("../models/Role"),
  RolesPermisos: require("../models/RolesPermisos"),
  Permiso: require("../models/Permiso"),
  UsersPermiso: require("../models/UsersPermisos"),

  Encargado: require("../models/Inmueble/encargado.models"),
  Inmueble: require("../models/Inmueble/inmueble.models"),
  Propietario: require("../models/Inmueble/propietario.models"),

  Candidate: require("../models/Offers/candidate.model"),
  CandidateStatus: require("../models/Offers/candidateStatus.model"),
  Contracting: require("../models/Offers/contracting.model"),
  ContractingStatus: require("../models/Offers/contractingStatus.modal"),
  Offers: require("../models/Offers/offers.model"),

  Calificacion: require("../models/Proveedores/calificacion.models"),
  Categoria: require("../models/Proveedores/categoria.models"),
  Proveedores: require("../models/Proveedores/provedores.models"),
  Servicios: require("../models/Proveedores/servicios.models"),
};
