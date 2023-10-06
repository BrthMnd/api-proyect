const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class CandidateStatusController {
	async getStatus(req, res, next) {
		try {
			const result = await db.CandidateStatus.find();
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener estados de candidato:", error);
			res.status(500).json({
				error: "Error al obtener estados de candidato",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async postStatus(req, res, next) {
		const { name, description } = req.body;

		try {
			const result = await db.CandidateStatus.create({
				name,
				description,
			});
			res.status(201).json(result);
		} catch (error) {
			console.error("Error al crear estado de candidato:", error);
			res.status(500).json({
				Error: "Error al crear estado de candidato",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async getIdStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.CandidateStatus.findById(id);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.error("Error al buscar estado de candidato por ID:", error);
		} finally {
			next();
		}
	}

	async putStatus(req, res, next) {
		const id = req.params.id;
		const update = req.body;
		try {
			const result = await db.CandidateStatus.findByIdAndUpdate(
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
				"Error al actualizar estado de candidato:",
				error.message
			);
		} finally {
			next();
		}
	}

	async deleteStatus(req, res, next) {
		const id = req.params.id;
		try {
			const reference = await db.Candidate.find({
				id_CandidateStatus: id,
			});
			if (reference.length > 0) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.CandidateStatus.findByIdAndDelete(id);
				res.status(200).send({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.error(
				"Error al eliminar estado de candidato:",
				error.message
			);
			res.status(500).send({
				error: "Error al eliminar estado de candidato",
			});
		} finally {
			next();
		}
	}
}

module.exports = CandidateStatusController;
