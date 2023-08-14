const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PruebaSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    age: { type: Number },
    address: { type: String },
    phone: { type: String },
  },
  {
    versionKey: false, // quita el __v
  }
);

const PruebaModels = mongoose.model("Prueba", PruebaSchema, "pruebas");

module.exports = {
  PruebaModels,
};
