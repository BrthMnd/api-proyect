const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PruebaModels } = require("../prueba.models");

let OffersSchema = new Schema({
  publicationDate: { type: Date, default: Date.now() },
  description: { type: String, maxLength: 1000 },
  id_property: { type: Schema.Types.ObjectId, ref: PruebaModels.modelName }, // <- prueba
});

let OffersModel = mongoose.model("Offers", OffersSchema);

module.exports = { OffersModel };
