const { Schema, model } = require("mongoose");

const OffersStatusSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  estado: { type: Boolean, default: true },
});

const OffersStatusModel = model(
  "ContractingStatus",
  OffersStatusSchema,
  "offers_OffersStatus"
);

module.exports = { OffersStatusModel };
