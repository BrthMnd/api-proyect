const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
	{
		nombreRol: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		versionKey: false, // __v: 0
	}
);

const Role = model("Role", roleSchema);

module.exports = Role;
