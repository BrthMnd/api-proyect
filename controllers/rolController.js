/** @format */

const rolQueries = require("../queries/rolQueries");
const { translateString } = require("../utils/Functions");

class rolController {
	// Ruta para obtener todos los roles
	async getRoles(req, res) {
		try {
			const roles = await rolQueries.getAllRoles();
			res.status(200).json(roles);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para obtener todos los permisos
	async getPermissions(req, res) {
		try {
			const permisos = await rolQueries.getAllPermisos();
			res.status(200).json(permisos);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	//lista de roles y usuarios
	async getUserRolesList(req, res) {
		try {
			const listaRolesUsuarios = await rolQueries.getListaRolesUsuarios();
			res.status(200).json(listaRolesUsuarios);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	async getUsuariosWithPermission(req, res) {
		try {
			const listaUsuarios = await rolQueries.getUsuariosFromPermiso(
				req.params.id
			);
			res.status(200).json(listaUsuarios);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	async getUsuariosPermissionsList(req, res) {
		try {
			const listaPermisosUsuarios = await rolQueries.getListaPermisosUsuarios();
			res.status(200).json(listaPermisosUsuarios);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para crear un nuevo rol
	async createRole(req, res) {
		try {
			let { rol, permisions } = req.body;
			const newRole = await rolQueries.createRole(rol, permisions);
			res.status(201).json(newRole);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para crear un nuevo permiso
	async createPermission(req, res) {
		try {
			const newPermiso = await rolQueries.createPermiso(req.body);
			res.status(201).json(newPermiso);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para asignar un permiso a un usuario
	async givePermissionToUser(req, res) {
		try {
			const rolesPermisos = await rolQueries.assignPermisoToUser(
				req.params.id_usuario,
				req.params.id_permiso
			);
			res.status(201).json(rolesPermisos);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para asignar un rol a un usuario
	async giveRoleToUser(req, res) {
		try {
			const user = await rolQueries.assignRoleToUser(
				req.params.id_usuario,
				req.params.roleId
			);
			res.status(200).json(user);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para revocar un permiso de un usuario
	async removePermission(req, res) {
		try {
			const deletedRolesPermisos = await rolQueries.revokePermisoFromUser(
				req.params.userId,
				req.params.permisoId
			);
			res.status(200).json(deletedRolesPermisos);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para revocar un rol de un usuario
	async revokeRoleFromUser(req, res) {
		try {
			const user = await rolQueries.revokeRoleFromUser(req.params.userId);
			res.status(200).json(user);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para obtener todos los permisos de un usuario
	async getPermissionsFromUser(req, res) {
		try {
			const permisos = await rolQueries.getAllPermisosByUser(
				req.params.userId
			);
			res.status(200).json(permisos);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para obtener rol por su id
	async getRoleByID(req, res) {
		try {
			const role = await rolQueries.getRoleById(req.params.id);
			res.status(200).json(role);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para editar un rol
	async editRole(req, res) {
		try {
			const role = await rolQueries.updateRoleById(
				req.params.id,
				req.body.rol,
				req.body.permisions
			);
			res.status(200).json(role);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para obtener permiso por su id
	async getPermissionByID(req, res) {
		try {
			const role = await rolQueries.getpermisionById(req.params.id);
			res.status(200).json(role);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Ruta para editar un permiso
	async editPermission(req, res) {
		try {
			const role = await rolQueries.updatepermisionById(
				req.params.id,
				req.body
			);
			res.status(200).json(role);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to delete a role by their ID
	async deleteRole(req, res) {
		try {
			const deletedrole = await rolQueries.deleteRol(req.params.id);
			if (!deletedrole) {
				res.status(404).json({ message: "rol no encontrado" });
				return;
			}
			res.status(200).json({ message: "role deleted successfully" });
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to delete a permision by their ID
	async deletePermission(req, res) {
		try {
			const deletedpermision = await rolQueries.deletePermision(
				req.params.id
			);
			if (!deletedpermision) {
				res.status(404).json({ message: "permiso no encontrado" });
				return;
			}
			res.status(200).json({ message: "permision deleted successfully" });
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}
}

module.exports = rolController;
