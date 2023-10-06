const { Schema, model } = require("mongoose");
const Categoria = require("./categoria.models");

const servicioSchema = new Schema(
	{
		Nombre_Servicio: { type: String, unique: true, require: true },
		Descripcion: { type: String, require: true },
		estado: { type: Boolean, default: true },
		Categoria_Servicio: {
			type: Schema.Types.ObjectId,
			ref: Categoria.modelName,
		},
	},
	{
		versionKey: false, // __v: 0
	}
);

const Servicio = model("Servicio", servicioSchema, "service_servicio");

module.exports = Servicio;
