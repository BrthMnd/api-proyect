const { Schema, model } = require("mongoose");

const ContractingStatusSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  estado: { type: Boolean, default: true },
});

const ContractingStatusModel = model(
  "ContractingStatus",
  ContractingStatusSchema,
  "offers_ContractingStatus"
);

module.exports = { ContractingStatusModel };
