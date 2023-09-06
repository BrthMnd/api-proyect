const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EncargadoSchema = new Schema(
  {
    documento: { type: Number },
    nombres: { type: String },
    apellidos: { type: String },
    correo: { type: String },
    telefono: { type: String },
    estado: { type: Boolean, default: true },
    direccion: { type: String },
    fechCreacion: { type: Date, default: Date.now() },
  },
  {
    versionKey: false, // __v: 0
  }
);

const EncargadoModels = mongoose.model(
  "Encargados",
  EncargadoSchema,
  "encargados"
);

module.exports = {
  EncargadoModels,
};
