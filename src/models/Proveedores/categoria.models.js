const { Schema, model } = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");

const categoriaServicioSchema = new Schema({
  Nombre_Categoria: { type: String, unique: true, require: true },
  Descripcion: { type: String },
  Fecha_Creacion: { type: String, default: FechaActual },
  Estado: { type: Boolean, default: true },
});

const CategoriaModel = model("CategoriaServicio", categoriaServicioSchema, "service_ServiceCategority");

module.exports = { CategoriaModel }; // models
