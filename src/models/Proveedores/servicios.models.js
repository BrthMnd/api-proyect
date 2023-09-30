const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { CategoriaModel } = require("./categoria.models");
const servicioSchema = new Schema({
  Nombre_Servicio: { type: String, unique: true, require: true },
  Descripcion: { type: String, require: true },
  estado: { type: Boolean, default: true },
  Categoria_Servicio: {
    type: Schema.Types.ObjectId,
    ref: CategoriaModel.modelName,
  },
});

const ServicioModels = mongoose.model(
  "Servicio",
  servicioSchema,
  "service_servicio"
);

module.exports = {
  ServicioModels,
};
