const { Schema, model } = require("mongoose");
const FechaActual = require("../../utils/tools/date.tools");
const Inmueble = require("../Inmueble/inmueble.models");
const Servicio = require("../Proveedores/servicios.models");

const OffersSchema = new Schema(
	{
		publicationDate: { type: String, default: FechaActual, required: true },
		description: { type: String, maxLength: 500, required: true },
		status: { type: Boolean, default: true },
		id_property: {
			type: Schema.Types.ObjectId,
			ref: Inmueble.modelName,
			required: true,
		},
		id_service: {
			type: Schema.Types.ObjectId,
			ref: Servicio.modelName,
			required: true,
		},
	},
	{
		versionKey: false, // __v: 0
	}
);

const Offers = model("Offers", OffersSchema, "offers_Offers");

module.exports = Offers;
