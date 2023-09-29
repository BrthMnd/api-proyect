const { Schema, model } = require("mongoose");
const { OffersModel } = require("./offers.model");
const { FechaActual } = require("../../tools/date.tools");
const { CandidateStatusModel } = require("./candidate_status.model");
const { ProveedoresModels } = require("../Proveedores/provedores.models");
const CandidateSchema = new Schema({
  id_offers: {
    type: Schema.Types.ObjectId,
    ref: OffersModel.modelName,
    required: true,
  },
  id_ServiceProvider: {
    type: Schema.Types.ObjectId,
    ref: ProveedoresModels.modelName,
    unique: true,
  },
  id_CandidateStatus: {
    type: Schema.Types.ObjectId,
    ref: CandidateStatusModel.modelName,
    required: true,
  },
  DateApplied: { type: String, default: FechaActual },
});

const CandidateModel = model("Candidate", CandidateSchema, "Candidate");

module.exports = { CandidateModel };
