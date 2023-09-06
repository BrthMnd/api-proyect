const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { OffersModel } = require("./offers.models");
const { ServicioModels } = require("../Proveedores/servicios.models");

let ServiceOffersSchema = new Schema({
  id_status: { type: Schema.Types.ObjectId, ref: ServicioModels.modelName },
  id_offers: { type: Schema.Types.ObjectId, ref: OffersModel.modelName },
});

let ServiceOffersModel = mongoose.model(
  "Relationship_OffersService",
  ServiceOffersSchema,
  "Relationship_OffersService"
);

module.exports = { ServiceOffersModel };
