const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropietarioSchema = new Schema(
  {
    documento: { type: Number },
    nombre: { type: String },
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

const PropietarioModels = mongoose.model(
  "Propietarios",
  PropietarioSchema,
  "property_Owner"
);

module.exports = {
  PropietarioModels,
};
