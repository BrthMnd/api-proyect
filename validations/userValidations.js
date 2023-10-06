const db = require("../db/dbConfig");

// Función para verificar si el usuario existe en la base de datos
async function userExists(email) {
	try {
		const user = await db.User.findOne({ correo: email });
		return !!user;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	userExists,
};
