const { Schema, model } = require("mongoose");
const { CandidateModel } = require("./candidate.model");
const { ContractingStatusModel } = require("./contractingStatus.modal");
const { FechaActual } = require("../../tools/date.tools");
const { OffersModel } = require("./offers.model");
const { ProveedoresModels } = require("../Proveedores/provedores.models");

let ContractingSchema = new Schema({
  id_contractingStatus: {
    type: Schema.Types.ObjectId,
    ref: ContractingStatusModel.modelName,
    default: "6517a65267ef711613a4f308",
  },
  id_candidates: { type: Schema.Types.ObjectId, ref: CandidateModel.modelName },
  id_proveedor: {
    type: Schema.Types.ObjectId,
    ref: ProveedoresModels.modelName,
  },
  id_offers: { type: Schema.Types.ObjectId, ref: OffersModel.modelName },
  DateApplied: { type: String, default: FechaActual },
});

let ContractingModal = model(
  "ContractingModal",
  ContractingSchema,
  "offers_Contracting"
);

module.exports = { ContractingModal };
