const mongoose = require("mongoose");
const { FechaActual } = require("../../tools/date.tools");
const Schema = mongoose.Schema;
const { InmuebleModels } = require("../Inmueble/inmueble.models");
const { StatusModel } = require("./status.models");
const { ServicioModels } = require("../Proveedores/servicios.models");

let OffersSchema = new Schema({
  publicationDate: { type: String, default: FechaActual },
  description: { type: String, maxLength: 1000 },
  id_property: { type: Schema.Types.ObjectId, ref: InmuebleModels.modelName },
  id_status: { type: Schema.Types.ObjectId, ref: StatusModel.modelName },
  id_service: { type: Schema.Types.ObjectId, ref: ServicioModels.modelName },
});

let OffersModel = mongoose.model("Offers", OffersSchema);

module.exports = { OffersModel };
