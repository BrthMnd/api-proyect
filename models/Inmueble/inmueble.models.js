const { Schema, model } = require("mongoose");
const Propietario = require("./propietario.models");
const FechaActual = require("../../utils/tools/date.tools");
const Encargado = require("./encargado.models");

const InmuebleSchema = new Schema(
	{
		tipoPropiedad: { type: String, require: true },
		direccion: { type: String, require: true },
		metrosCuadrados: { type: Number, require: true },
		nHabitaciones: { type: Number, require: true },
		nBanos: { type: Number, require: true },
		estado: { type: Boolean, default: true },
		fechConstruccion: {
			type: String,
			default: "2005-11-22",
			require: true,
		},
		id_propietario: {
			type: Schema.Types.ObjectId,
			ref: Propietario.modelName,
			require: true,
		},
		id_encargado: {
			type: Schema.Types.ObjectId,
			ref: Encargado.modelName,
			require: true,
		},
		fechCreacion: { type: String, default: FechaActual },
	},
	{
		versionKey: false,
	}
);
const Inmueble = model("Inmuebles", InmuebleSchema, "property_Property");

module.exports = Inmueble;
