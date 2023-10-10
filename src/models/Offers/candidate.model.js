const { Schema, model } = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");
//
const { OffersModel } = require("./offers.model");
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
    },
  ],
  id_CandidateStatus: { type: Boolean, default: true },
  selectedCandidate: { type: String, default: "" },
  DateApplied: { type: String, default: FechaActual },
});

const CandidateModel = model("Candidate", CandidateSchema, "offers_Candidate");

module.exports = { CandidateModel };
