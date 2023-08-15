const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PruebaModels } = require("./prueba.models");
console.log(PruebaModels.modelName);
const Prueba2 = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    friend: [{ type: Schema.Types.ObjectId, ref: PruebaModels.modelName }],
  },
  {
    versionKey: false, // quita el __v
  }
);

const Prueba2Models = mongoose.model("segundaPrueba", Prueba2);

module.exports = {
  Prueba2Models,
};
