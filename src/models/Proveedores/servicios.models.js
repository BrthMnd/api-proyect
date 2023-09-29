const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { CategoriaModel } = require("./categoria.models");
const servicioSchema = new Schema({
  Nombre_Servicio: { type: String },
  Descripcion: String,
  estado: { type: Boolean, default: true },
  Categoria_Servicio: {
    type: Schema.Types.ObjectId,
    ref: CategoriaModel.modelName,
  },
});

const ServicioModels = mongoose.model("Servicio", servicioSchema, "servicio");

module.exports = {
  ServicioModels,
};
