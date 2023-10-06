const { Schema, model } = require("mongoose");
const Role = require("./Role");
const Permiso = require("./Permiso");

const rolesPermisosSchema = new Schema(
	{
		id_rol: {
			type: Schema.Types.ObjectId,
			ref: Role.modelName,
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

const RolesPermisos = model("RolesPermiso", rolesPermisosSchema);

module.exports = RolesPermisos;
