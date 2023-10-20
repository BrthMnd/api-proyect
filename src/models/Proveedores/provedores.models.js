const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { CalificacionModel } = require("./calificacion.models");
const proveedoresSchema = new Schema(
  {
    nombre: { type: String, require: true },
    documento: { type: String, unique: true },
    telefono: { type: String, require: true, unique: true },
    email: { type: String, unique: true },
    direccion: { type: String, require: true },
    id_calificacion: [
      {
        type: Schema.Types.ObjectId,
        ref: CalificacionModel.modelName,
      },
    ],
  },
  {
    versionKey: false, // __v: 0
  }
);
const ProveedoresModels = mongoose.model(
  "Proveedores",
  proveedoresSchema,
  "providers_Providers"
);

module.exports = { ProveedoresModels };
