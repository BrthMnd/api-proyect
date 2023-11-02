const { Schema, model } = require("mongoose");
const { CandidateModel } = require("./candidate.model");
const { FechaActual } = require("../../tools/date.tools");
const { OffersModel } = require("./offers.model");
const { ProveedoresModels } = require("../Proveedores/provedores.models");

let ContractingSchema = new Schema({
  estado: { type: Boolean, default: true },
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
