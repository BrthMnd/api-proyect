const { Schema, model } = require("mongoose");
const EmployedSchema = new Schema({
  Nombre: { type: String, require: true },
  Apellido: { type: String, require: true },
  Documento: { type: String, unique: true, require: true },
  Telefono: { type: String, require: true },
  Direccion: { type: String, require: true },
});

const Employed_Model = model("Employed", EmployedSchema, "user_Employed");

module.exports = {
  Employed_Model,
};
