const { Schema, model } = require("mongoose");
const EmployedSchema = new Schema({
  nombre: { type: String, require: true },
  documento: { type: String, unique: true, require: true },
  telefono: { type: String, require: true },
  direccion: { type: String, require: true },
});

const Employed_Model = model("Employed", EmployedSchema, "user_Employed");

module.exports = {
  Employed_Model,
};
