const mongoose = require("mongoose");
const { OffersModel } = require("./offers.models");
const { ProveedoresModels } = require("../Proveedores/provedores.models");
const { ContractingStatusModel } = require("./contractingStatus.models");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  id_offers: { type: Schema.Types.ObjectId, ref: OffersModel.modelName },
  id_ServiceProvider: {
    type: Schema.Types.ObjectId,
    ref: ProveedoresModels.modelName,
  },
  id_ContratingStatus: {
    type: Schema.Types.ObjectId,
    ref: ContractingStatusModel.modelName,
  },
  DateApplied: { type: Date, default: Date.now() },
});

const CandidateModel = mongoose.model("Candidate", CandidateSchema);

module.exports = { CandidateModel };
