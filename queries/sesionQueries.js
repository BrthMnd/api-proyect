const db = require("../db/dbConfig");

/** Create a new user and assign the Proveedor role and Ofertas permission */
async function createUser(data) {
	try {
		const userRole = await db.Role.findOne({ nombreRol: "Proveedor" });
		const readPermission = await db.Permiso.findOne({ permiso: "Ofertas" });
		const user = await db.User.create({
			...data,
			rol: userRole._id,
		});
		await db.UsersPermiso.create({
			id_usuario: user._id,
			id_permiso: readPermission._id,
		});
		return user;
	} catch (error) {
		throw error;
	}
}

/** Create a new user and assign the (rol) role and (rol)'s permissions */
async function createUserwithRol(data, rol) {
	try {
		const role = await db.Role.findOne({ nombreRol: rol });
		const permisionsFronRol = await db.RolesPermisos.find({
			id_rol: role._id,
		});
		const user = await db.User.create({
			...data,
			rol: role._id,
		});
		for (const permision of permisionsFronRol) {
			await db.UsersPermiso.create({
				id_usuario: user._id,
				id_permiso: permision.id_permiso,
			});
		}
		return user;
	} catch (error) {
		throw error;
	}
}

/** Obtener todos los usuarios sin incluir la contraseña */
async function getAllUsersWithoutPasswords() {
	try {
		const users = await db.User.find().populate("rol").select("correo rol");
		return users;
	} catch (error) {
		throw error;
	}
}

/**  Obtener todos los usuarios*/
async function getAllUsers() {
	try {
		const users = await db.User.find();
		return users;
	} catch (error) {
		throw error;
	}
}

/**  Obtener un usuario por su correo*/
const getUserByCorreo = async (correo) => {
	try {
		const user = await db.User.findOne({ correo: correo }).populate("rol");
		return user;
	} catch (error) {
		throw error;
	}
};

/**  Obtener un usuario por su ID*/
async function getUserById(userId) {
	try {
		const user = await db.User.findById(userId).populate("rol");
		return user;
	} catch (error) {
		throw error;
	}
}

/** Actualizar un usuario por su ID*/
async function updateUser(userId, data, rol) {
	try {
		const updatedUser = await db.User.findByIdAndUpdate(userId, data, {
			new: true,
		});
		await db.UsersPermiso.deleteMany({ id_usuario: userId });
		const role = await db.Role.findOne({ nombreRol: rol });
		const permisionsFronRol = await db.RolesPermisos.find({
			id_rol: role._id,
		});
		for (const permision of permisionsFronRol) {
			await db.UsersPermiso.create({
				id_usuario: userId,
				id_permiso: permision.id_permiso,
			});
		}
		return updatedUser;
	} catch (error) {
		throw error;
	}
}

/** Actualizar la contraseña de usuario por su correo*/
async function updatePasswordByEmail(correo, data) {
	try {
		const user = await db.User.findOne({ correo });
		user.contraseña = data;
		await user.save();
		return user;
	} catch (error) {
		throw error;
	}
}

/**  Eliminar un usuario por su ID*/
async function deleteUser(userId) {
	try {
		const deletedUser = await db.User.findByIdAndDelete({ _id: userId });

		console.log("Eliminando usuario: " + userId + " y todos sus permisos");
		await db.UsersPermiso.deleteMany({ id_usuario: userId });
		return deletedUser;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getUserByCorreo,
	getAllUsersWithoutPasswords,
	createUserwithRol,
	updatePasswordByEmail,
};
