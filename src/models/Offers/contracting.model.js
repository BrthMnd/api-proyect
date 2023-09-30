const { Schema, model } = require("mongoose");
const { CandidateModel } = require("./candidate.model");
const { ContractingStatusModel } = require("./contractingStatus.modal");
const { FechaActual } = require("../../tools/date.tools");

let ContractingSchema = new Schema({
  id_candidates: { type: Schema.Types.ObjectId, ref: CandidateModel.modelName },
  id_contractingStatus: {
    type: Schema.Types.ObjectId,
    ref: ContractingStatusModel.modelName,
    default: "651794f70948970924381ad5",
  },
  DateApplied: { type: String, default: FechaActual },
});

let ContractingModal = model(
  "ContractingModal",
  ContractingSchema,
  "offers_Contracting"
);

module.exports = { ContractingModal };
