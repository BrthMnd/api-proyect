const { Schema, model } = require("mongoose");

const proveedoresSchema = new Schema({
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  Telefono: String,
  Email: { type: String, required: true },
  Direccion: String,
});
const ProveedoresModels = model("Proveedores", proveedoresSchema);

module.exports = { ProveedoresModels };
