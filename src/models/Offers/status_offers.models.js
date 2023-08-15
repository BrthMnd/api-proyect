const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { OffersModel } = require("./offers.models");
const { StatusModel } = require("./status.models");

let StatusOffersSchema = new Schema({
  id_status: { type: Schema.Types.ObjectId, ref: StatusModel.modelName },
  id_offers: { type: Schema.Types.ObjectId, ref: OffersModel.modelName },
});

let StatusOffersModel = mongoose.model(
  "relationsOffersStatus",
  StatusOffersSchema,
  "Relationship_OffersStatus"
);

module.exports = { StatusOffersModel };
