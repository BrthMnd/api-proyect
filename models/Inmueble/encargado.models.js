const { Schema, model } = require("mongoose");
const FechaActual = require("../../utils/tools/date.tools");

const EncargadoSchema = new Schema(
	{
		documento: { type: Number, unique: true, require: true },
		nombre: { type: String, require: true },
		correo: { type: String, unique: true },
		telefono: { type: String, require: true },
		estado: { type: Boolean, default: true },
		direccion: { type: String, require: true },
		fechCreacion: { type: String, default: FechaActual },
	},
	{
		versionKey: false, // __v: 0
	}
);

const Encargado = model("Encargados", EncargadoSchema, "property_Manager");

module.exports = Encargado;
