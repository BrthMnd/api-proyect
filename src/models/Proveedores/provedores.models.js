const { Schema, model } = require("mongoose");

const proveedoresSchema = new Schema({
  Nombre: { type: String },
  Apellido: { type: String },
  Telefono: String,
  Email: { type: String },
  Direccion: String,
});
const ProveedoresModels = model("Proveedores", proveedoresSchema);

module.exports = { ProveedoresModels };
