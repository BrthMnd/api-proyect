const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const categoriaServicioSchema = new Schema({
  Nombre_Categoria: { type: String },
  Descripcion: String,
  Fecha_Creacion: { type: Date, default: Date.now },
  Estado: { type: Boolean, default: true }
});

const CategoriaServicio = model('CategoriaServicio', categoriaServicioSchema);

module.exports = {CategoriaServicio}; // models