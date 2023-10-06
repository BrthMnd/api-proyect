const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class ContractingController {
	async getStatus(req, res, next) {
		try {
			const result = await db.Contracting.find()
				.populate("id_candidates")
				.populate("id_contractingStatus");
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener estados de contratación:", error);
			res.status(500).json({
				error: "Error al obtener estados de contratación",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async postStatus(req, res, next) {
		try {
			const result = await db.Contracting.create(req.body);
			res.status(201).json(result);
		} catch (error) {
			console.error("Error al crear estado de contratación:", error);
			res.status(500).json({
				Error: "Error al crear estado de contratación",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async getIdStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Contracting.findById(id)
				.populate("id_candidates")
				.populate("id_contractingStatus");
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.error(
				"Error al buscar estado de contratación por ID:",
				error
			);
		} finally {
			next();
		}
	}

	async putStatus(req, res, next) {
		const id = req.params.id;
		const update = req.body;
		try {
			const result = await db.Contracting.findByIdAndUpdate(id, update, {
				new: true,
			});
			if (result) {
				res.status(200).json({
					message: "Documento actualizado exitosamente",
					result,
				});
			} else {
				res.status(500).json({
					error: "Error al actualizar el documento",
				});
			}
		} catch (error) {
			console.error(
				"Error al actualizar estado de contratación:",
				error.message
			);
		} finally {
			next();
		}
	}

	async deleteStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Contracting.findByIdAndDelete(id);
			if (result) {
				res.status(200).json({ message: "Borrado con éxito", result });
			} else {
				res.status(500).json({ error: "Error al eliminar el archivo" });
			}
		} catch (error) {
			console.error(
				"Error al eliminar estado de contratación:",
				error.message
			);
		} finally {
			next();
		}
	}
}

module.exports = ContractingController;
