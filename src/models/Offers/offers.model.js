const { Schema, model } = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");
const { InmuebleModels } = require("../Inmueble/inmueble.models");
const { ServicioModels } = require("../Proveedores/servicios.models");
const { OffersStatus_Model } = require("./OfferStatus");
const { ObjectId } = require("mongodb");

let OffersSchema = new Schema({
  publicationDate: { type: String, default: FechaActual, required: true },
  description: { type: String, maxLength: 500, required: true },
  id_OfferStatus: {
    type: Schema.Types.ObjectId,
    ref: OffersStatus_Model.modelName,
    required: true,
    default: new ObjectId("65362881c8c96ecfeece3b99"),
  },
  id_property: {
    type: Schema.Types.ObjectId,
    ref: InmuebleModels.modelName,
    required: true,
  },
  id_service: {
    type: Schema.Types.ObjectId,
    ref: ServicioModels.modelName,
    required: true,
  },
});
//
let OffersModel = model("Offers", OffersSchema, "offers_Offers");

module.exports = { OffersModel };
