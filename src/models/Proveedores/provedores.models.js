const { Schema, model } = require("mongoose");

const proveedoresSchema = new Schema({
  Nombre: { type: String, require: true },
  Apellido: { type: String, require: true },
  Documento: { type: String, unique: true, require: true },
  Telefono: { type: String, require: true },
  Email: { type: String, unique: true },
  Direccion: { type: String, require: true },
},
{
  versionKey: false, // __v: 0
}
);
const ProveedoresModels = model("Proveedores", proveedoresSchema,"providers_Providers");

module.exports = { ProveedoresModels };
