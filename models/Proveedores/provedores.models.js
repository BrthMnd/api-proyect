const { Schema, model } = require("mongoose");

const proveedoresSchema = new Schema(
	{
		Nombre: { type: String },
		Apellido: { type: String },
		Telefono: String,
		Email: { type: String },
		Direccion: String,
	},
	{
		versionKey: false, // __v: 0
	}
);
const Proveedores = model("Proveedores", proveedoresSchema);

module.exports = Proveedores;
