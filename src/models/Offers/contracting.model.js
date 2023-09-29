const { Schema, model } = require("mongoose");

let ContractingSchema = new Schema({
  id_candidates: { type: Schema.Types.ObjectId, ref: candidate.modelName },
  id_contractingStatus: {
    type: Schema.Types.ObjectId,
    ref: ContractingStatusModel.modelName,
  },
  DateApplied: { type: String, default: FechaActual },
});

let ContractingModal = mongoose.model(
  "ContractingModal",
  ContractingSchema,
  "ContractingModal"
);

module.exports = { ContractingModal };
