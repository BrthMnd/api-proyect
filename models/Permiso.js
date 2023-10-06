const { Schema, model } = require("mongoose");

const permisoSchema = new Schema(
	{
		permiso: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		versionKey: false, // __v: 0
	}
);

const Permiso = model("Permiso", permisoSchema);

module.exports = Permiso;
