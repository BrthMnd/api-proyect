const db = require("../db/dbConfig");

/**  Obtener todos los roles*/
async function getAllRoles() {
	try {
		const roles = await db.Role.find();
		return roles;
	} catch (error) {
		throw error;
	}
}

/** Obtener todos los permisos*/
async function getAllPermisos() {
	try {
		const permisos = await db.Permiso.find();
		return permisos;
	} catch (error) {
		throw error;
	}
}

/** Crear un nuevo rol*/
async function createRole(data, permisions) {
	try {
		const newRole = await db.Role.create(data);
		for (const permision of permisions) {
			await db.RolesPermisos.create({
				id_permiso: permision,
				id_rol: newRole._id,
			});
		}
		return newRole;
	} catch (error) {
		throw error;
	}
}

/** Crear un nuevo permiso*/
async function createPermiso(data) {
	try {
		const newPermiso = await db.Permiso.create(data);
		return newPermiso;
	} catch (error) {
		throw error;
	}
}

/** Asignar un permiso a un usuario específico */
async function assignPermisoToUser(userId, permisoId) {
	try {
		const user = await db.User.findById(userId);
		const permiso = await db.Permiso.findById(permisoId);

		if (!user || !permiso) {
			throw new Error("User or permiso not found");
		}

		const UsersPermiso = await db.UsersPermiso.create({
			id_usuario: user._id,
			id_permiso: permiso._id,
		});

		return UsersPermiso;
	} catch (error) {
		throw error;
	}
}

/** Revocar un permiso de un usuario específico */
async function revokePermisoFromUser(userId, permisoId) {
	try {
		const deletedUsersPermiso = await db.UsersPermiso.findOneAndDelete({
			id_usuario: userId,
			id_permiso: permisoId,
		});

		if (!deletedUsersPermiso) {
			throw new Error("User or permiso not found");
		}

		return deletedUsersPermiso;
	} catch (error) {
		throw error;
	}
}

/** Asignar un rol a un usuario*/
async function assignRoleToUser(userId, roleId) {
	try {
		const user = await db.User.findById(userId);
		const role = await db.Role.findById(roleId);

		if (!user || !role) {
			throw new Error("User or role not found");
		}

		user.rol = role._id;
		await user.save();

		return user;
	} catch (error) {
		throw error;
	}
}

/** Desasignar un rol de un usuario*/
async function revokeRoleFromUser(userId) {
	try {
		const user = await db.User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		user.rol = null;
		await user.save();

		return user;
	} catch (error) {
		throw error;
	}
}

/** Obtener el rol por su ID */
async function getRoleById(roleId) {
	try {
		const role = await db.Role.findById(roleId);
		if (!role) {
			throw new Error("Role not found");
		}
		const permisos = await db.RolesPermisos.find({ id_rol: roleId });
		return {
			rol: role,
			permisos: permisos,
		};
	} catch (error) {
		throw error;
	}
}

/** editar el rol por su ID */
async function updateRoleById(roleId, rol, permisions) {
	try {
		let role = await db.Role.findByIdAndUpdate(roleId, rol, {
			new: true,
		});
		if (!role) {
			throw new Error("Role not found");
		}
		await db.RolesPermisos.deleteMany({ id_rol: roleId });
		for (const permision of permisions) {
			await db.RolesPermisos.create({
				id_permiso: permision,
				id_rol: roleId,
			});
		}
		return role;
	} catch (error) {
		throw error;
	}
}

/** Obtener el permiso por su ID */
async function getpermisionById(Id) {
	try {
		const role = await db.Permiso.findById(Id);
		if (!role) {
			throw new Error("Permiso not found");
		}
		return role;
	} catch (error) {
		throw error;
	}
}

/** editar el permiso por su ID */
async function updatepermisionById(Id, data) {
	try {
		let role = await db.Permiso.findByIdAndUpdate(Id, data, {
			new: true,
		});
		if (!role) {
			throw new Error("Permiso not found");
		}
		return role;
	} catch (error) {
		throw error;
	}
}

/** Obtener todos los permisos de un usuario */
async function getAllPermisosByUser(userId) {
	try {
		const UsersPermiso = await db.UsersPermiso.find({
			id_usuario: userId,
		}).populate("id_permiso");
		const permisos = UsersPermiso.map((rp) => rp.id_permiso);
		return permisos;
	} catch (error) {
		throw error;
	}
}

async function getListaRolesUsuarios() {
	try {
		const roles = await db.Role.find();
		const listaRolesUsuarios = [];

		for (const rol of roles) {
			const usuarios = await db.User.find({ rol: rol._id });
			listaRolesUsuarios.push({
				rol: rol,
				usuarios: usuarios,
			});
		}

		return listaRolesUsuarios;
	} catch (error) {
		throw error;
	}
}

async function getListaPermisosUsuarios() {
	try {
		const permisos = await db.Permiso.find();
		const listaPermisosUsuarios = [];

		for (const permiso of permisos) {
			const usuariosPermisos = await db.UsersPermiso.find({
				id_permiso: permiso._id,
			});
			const usuariosIds = usuariosPermisos.map((item) => item.id_usuario);
			const usuarios = await db.User.find({ _id: { $in: usuariosIds } });

			listaPermisosUsuarios.push({
				permiso: permiso,
				usuarios: usuarios,
			});
		}

		return listaPermisosUsuarios;
	} catch (error) {
		throw error;
	}
}

async function getUsuariosFromPermiso(id) {
	try {
		const usuariosPermisos = await db.UsersPermiso.find({
			id_permiso: id,
		}).populate("id_usuario");

		return usuariosPermisos;
	} catch (error) {
		throw error;
	}
}

/**  Eliminar un rol por su ID*/
async function deleteRol(Id) {
	try {
		const deleted = await db.Role.findOneAndDelete({ _id: Id });
		console.log("Eliminando rol: " + Id + " y todos sus permisos");
		await db.RolesPermisos.deleteMany({ id_rol: Id });
		return deleted;
	} catch (error) {
		throw error;
	}
}

/**  Eliminar un permiso por su ID*/
async function deletePermision(Id) {
	try {
		const deleted = await db.Permiso.findOneAndDelete({ _id: Id });

		console.log("Eliminando permiso: " + Id + " y todas sus relaciones");

		await db.UsersPermiso.deleteMany({ id_permiso: Id });
		await db.RolesPermisos.deleteMany({ id_permiso: Id });
		return deleted;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAllRoles,
	getAllPermisos,
	createRole,
	createPermiso,
	assignPermisoToUser,
	revokePermisoFromUser,
	assignRoleToUser,
	revokeRoleFromUser,
	getAllPermisosByUser,
	getRoleById,
	getListaRolesUsuarios,
	getListaPermisosUsuarios,
	deleteRol,
	deletePermision,
	updateRoleById,
	getpermisionById,
	updatepermisionById,
	getUsuariosFromPermiso,
};
