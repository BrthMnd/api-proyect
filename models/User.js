const { Schema, model } = require("mongoose");
const Role = require("./Role");

const userSchema = new Schema(
	{
		correo: {
			type: String,
			required: true,
			unique: true,
		},
		contraseña: {
			type: String,
			required: true,
		},
		rol: {
			type: Schema.Types.ObjectId,
			ref: Role.modelName,
			required: true,
		},
	},
	{
		versionKey: false, // __v: 0
	}
);

const User = model("User", userSchema);

module.exports = User;
