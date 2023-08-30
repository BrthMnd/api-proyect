const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const servicioSchema = new Schema({
  Nombre_Servicio: { type: String },
  Descripcion: String,
  estado: { type: Boolean },
  Categoria_Servicio: { type: String },
});

const ServicioModels = mongoose.model("Servicio", servicioSchema, "servicio");

module.exports = {
  ServicioModels,
};
