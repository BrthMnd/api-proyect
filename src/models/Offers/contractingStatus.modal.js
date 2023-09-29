const { Schema, model } = require("mongoose");

const ContractingStatusSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, unique: true, required: true },
  status: { type: Boolean, default: true },
});

const ContractingStatusModel = model(
  "ContractingStatus",
  ContractingStatusSchema,
  "ContractingStatus"
);

module.exports = { ContractingStatusModel };
