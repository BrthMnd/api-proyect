const { Schema, model } = require("mongoose");

const calificacionSchema = new Schema(
	{
		Comentarios: String,
		CalificacionesFloat: { type: Number },
	},
	{
		versionKey: false, // __v: 0
	}
);

const Calificacion = model("Calificacion", calificacionSchema, "calificacion");

module.exports = Calificacion;
