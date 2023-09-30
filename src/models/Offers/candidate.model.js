const { Schema, model } = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");
//
const { OffersModel } = require("./offers.model");
const { CandidateStatusModel } = require("./candidateStatus.model");
const { ProveedoresModels } = require("../Proveedores/provedores.models");
const CandidateSchema = new Schema({
  id_offers: {
    type: Schema.Types.ObjectId,
    ref: OffersModel.modelName,
    required: true,
  },
  id_ServiceProvider: [
    {
      type: Schema.Types.ObjectId,
      ref: ProveedoresModels.modelName,
      unique: true,
    },
  ],
  id_CandidateStatus: {
    type: Schema.Types.ObjectId,
    ref: CandidateStatusModel.modelName,
    required: true,
    default: "651760a29407f722414e9d75",
  },
  DateApplied: { type: String, default: FechaActual },
});

const CandidateModel = model("Candidate", CandidateSchema, "offers_Candidate");

module.exports = { CandidateModel };
