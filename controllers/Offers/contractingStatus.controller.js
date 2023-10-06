const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class ContractingStatusController {
	async getStatus(req, res, next) {
		try {
			const result = await db.ContractingStatus.find();
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener estados de contrato:", error);
			res.status(500).json({
				error: "Error al obtener estados de contrato",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async postStatus(req, res, next) {
		try {
			const { name, description } = req.body;
			const result = await db.ContractingStatus.create({
				name,
				description,
			});
			res.status(201).json(result);
		} catch (error) {
			console.error("Error al crear estado de contrato:", error);
			res.status(500).json({
				Error: "Error al crear estado de contrato",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async getIdStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.ContractingStatus.findById(id);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.error(
				"Error al buscar estado de contrato por ID:",
				error.message
			);
		} finally {
			next();
		}
	}

	async putStatus(req, res, next) {
		const id = req.params.id;
		const update = req.body;
		try {
			const result = await db.ContractingStatus.findByIdAndUpdate(
				id,
				update,
				{ new: true }
			);
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
				"Error al actualizar estado de contrato:",
				error.message
			);
		} finally {
			next();
		}
	}

	async deleteStatus(req, res, next) {
		const id = req.params.id;
		try {
			const reference = await db.Contracting.find({
				id_contractingStatus: id,
			});
			console.log(reference);
			if (reference.length > 0) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.ContractingStatus.findByIdAndDelete(id);
				res.status(200).json({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.error(
				"Error al eliminar estado de contrato:",
				error.message
			);
			res.status(500).json({
				error: "error",
			});
		} finally {
			next();
		}
	}
}

module.exports = ContractingStatusController;
