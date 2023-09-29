const { Schema, model } = require("mongoose");

const categoriaServicioSchema = new Schema({
  Nombre_Categoria: { type: String },
  Descripcion: { type: String },
  Fecha_Creacion: { type: Date, default: Date.now() },
  Estado: { type: Boolean },
});

const CategoriaModel = model("CategoriaServicio", categoriaServicioSchema);

module.exports = { CategoriaModel }; // models
