const { Schema, model } = require("mongoose");
const Permiso = require("./Permiso");
const User = require("./User");

const usersPermisosSchema = new Schema(
	{
		id_usuario: {
			type: Schema.Types.ObjectId,
			ref: User.modelName,
			required: true,
		},
		id_permiso: {
			type: Schema.Types.ObjectId,
			ref: Permiso.modelName,
			required: true,
		},
	},
	{
		versionKey: false, // __v: 0
	}
);

const UsersPermiso = model("UsersPermiso", usersPermisosSchema);

module.exports = UsersPermiso;
