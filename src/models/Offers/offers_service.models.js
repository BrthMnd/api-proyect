const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { OffersModel } = require("./offers.models");
const { PruebaModels } = require("../prueba.models");

let ServiceOffersSchema = new Schema({
  id_status: { type: Schema.Types.ObjectId, ref: PruebaModels.modelName }, // <-Prueba
  id_offers: { type: Schema.Types.ObjectId, ref: OffersModel.modelName },
});

let ServiceOffersModel = mongoose.model(
  "Relationship_OffersService",
  ServiceOffersSchema,
  "Relationship_OffersService"
);

module.exports = { ServiceOffersModel };
