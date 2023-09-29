const { Schema, model } = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");
const { InmuebleModels } = require("../Inmueble/inmueble.models");
const { ServicioModels } = require("../Proveedores/servicios.models");

let OffersSchema = new Schema({
  publicationDate: { type: String, default: FechaActual, required: true },
  description: { type: String, maxLength: 500, required: true },
  status: { type: Boolean, default: true },
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

let OffersModel = model("Offers", OffersSchema, "Offers");

module.exports = { OffersModel };
