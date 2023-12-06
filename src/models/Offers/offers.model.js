const { Schema, model } = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");
const { InmuebleModels } = require("../Inmueble/inmueble.models");
const { CategoriaModel } = require("../Proveedores/categoria.models");

let OffersSchema = new Schema({
  publicationDate: { type: String, default: FechaActual, required: true },
  description: { type: String, maxLength: 500, required: true },
  state: { type: String, default: "Disponible" },
  id_property: {
    type: Schema.Types.ObjectId,
    ref: InmuebleModels.modelName,
    required: true,
  },
  id_Category_service: {
    type: Schema.Types.ObjectId,
    ref: CategoriaModel.modelName,
    required: true,
  },
  estado: { type: Boolean, default: true },
});
//
let OffersModel = model("Offers", OffersSchema, "offers_Offers");

module.exports = { OffersModel };
