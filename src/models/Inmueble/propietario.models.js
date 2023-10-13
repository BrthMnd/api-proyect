const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FechaActual } = require("../../tools/date.tools");

const PropietarioSchema = new Schema(
  {
    documento: { type: Number, unique: true, require: true },
    nombre: { type: String, require: true },
    correo: { type: String, unique: true },
    telefono: { type: String, require: true },
    estado: { type: Boolean, default: true },
    direccion: { type: String, require: true },
    fechCreacion: { type: String, default: FechaActual },
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
