const queries = require("../queries/sesionQueries");
const { translateString } = require("../utils/Functions");

class sesionController {
	// Route to create a new user
	async createUser(req, res) {
		try {
			const newUser = await queries.createUser(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to get all users Without Passwords
	async getUsersNoPassword(req, res) {
		try {
			const users = await queries.getAllUsersWithoutPasswords();
			res.status(200).json(users);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to get all users
	async getUsers(req, res) {
		try {
			const users = await queries.getAllUsers();
			res.status(200).json(users);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to get a user by their correo (email)
	async getUserByEmail(req, res) {
		try {
			const user = await queries.getUserByCorreo(req.params.correo);
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to initiate a login session
	async login(req, res) {
		try {
			const { correo, contraseña } = req.body;
			const user = await queries.getUserByCorreo(correo);

			if (!user || user.contraseña !== contraseña) {
				res.status(401).json({ message: "Credenciales Invalidas" });
				return;
			}

			res.status(200).json({ message: "Login successful" });
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to create a new user with a role
	async createUserWithRole(req, res) {
		try {
			const { rol } = req.params;
			const newUser = await queries.createUserwithRol(req.body, rol);
			res.status(201).json(newUser);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to get a user by their ID
	async getUserByID(req, res) {
		try {
			const user = await queries.getUserById(req.params.id);
			if (!user) {
				res.status(404).json({ message: "Usuario no encontrado" });
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to update a user by their ID
	async editUser(req, res) {
		try {
			let { data, rol } = req.body;
			const updatedUser = await queries.updateUser(
				req.params.id,
				data,
				rol
			);
			if (!updatedUser) {
				res.status(404).json({ message: "Usuario no encontrado" });
				return;
			}
			res.status(200).json(updatedUser);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to update a user's password by their email
	async editPassword(req, res) {
		try {
			const { nuevaContraseña } = req.body;
			const correo = req.params.correo;
			const updatedUser = await queries.updatePasswordByEmail(
				correo,
				nuevaContraseña
			);
			if (!updatedUser) {
				res.status(404).json({ message: "Usuario no encontrado" });
				return;
			}
			res.status(200).json(updatedUser);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}

	// Route to delete a user by their ID
	async deleteUser(req, res) {
		try {
			const deletedUser = await queries.deleteUser(req.params.id);
			if (!deletedUser) {
				res.status(404).json({ message: "Usuario no encontrado" });
				return;
			}
			res.status(200).json({ message: "User deleted successfully" });
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}
}
module.exports = sesionController;
