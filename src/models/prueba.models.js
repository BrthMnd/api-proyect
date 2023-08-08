const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PruebaSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false, // quita el __v
  }
);

const PruebaModels = mongoose.model("Prueba", PruebaSchema);

module.exports = {
  PruebaModels,
};
