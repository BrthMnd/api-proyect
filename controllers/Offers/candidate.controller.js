const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class CandidateControllers {
	async getStatus(req, res, next) {
		try {
			const result = await db.Candidate.find()
				.populate("id_offers")
				.populate("id_ServiceProvider")
				.populate("id_CandidateStatus");
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener Estados:", error);
			res.status(500).json({
				error: "Error al obtener Estados",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async postStatus(req, res, next) {
		const result = new db.Candidate(req.body);
		try {
			const savedResult = await result.save();
			res.status(201).json(savedResult);
		} catch (error) {
			console.error("Error al insertar un candidato:", error);
			res.status(500).json({
				error: "Error al insertar un candidato",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async getIdStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Candidate.findOne({
				_id: new ObjectId(id),
			})
				.populate("id_offers")
				.populate("id_ServiceProvider")
				.populate("id_CandidateStatus");
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.error("Error al buscar por ID:", error);
		} finally {
			next();
		}
	}

	async getIdForOffers(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Candidate.findOne({
				id_offers: new ObjectId(id),
			})
				.populate("id_offers")
				.populate("id_ServiceProvider")
				.populate("id_CandidateStatus");
			console.log(result);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.error("Error al buscar por ID de ofertas:", error);
		} finally {
			next();
		}
	}

	async putStatus(req, res, next) {
		const Update = req.body;
		const id = req.params.id;
		try {
			const result = await db.Candidate.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				Update,
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
			console.error("Error al actualizar el documento:", error.message);
		} finally {
			next();
		}
	}

	async AggregateNewCandidate(req, res, next) {
		const { id_ServiceProvider } = req.body;
		const candidateId = req.params.id;
		try {
			const result = await db.Candidate.findByIdAndUpdate(
				candidateId,
				{ $addToSet: { id_ServiceProvider: id_ServiceProvider } },
				{ new: true }
			);
			if (!result) {
				return res
					.status(404)
					.json({ error: "Candidato no encontrado." });
			}
			res.status(200).json(result);
		} catch (error) {
			console.error(
				"Error al agregar un proveedor de servicios al candidato:",
				error.message
			);
			return res.status(500).json({
				error:
					"Error al agregar un proveedor de servicios al candidato.",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async EliminateCandidate(req, res, next) {
		const serviceProviderIdToDelete = req.body.id_ServiceProvider;
		const candidateId = req.params.id;
		try {
			const result = await db.Candidate.findByIdAndUpdate(
				candidateId,
				{ $pull: { id_ServiceProvider: serviceProviderIdToDelete } },
				{ new: true }
			);
			if (!result) {
				return res
					.status(404)
					.json({ error: "Candidato no encontrado." });
			}
			res.status(200).json(result);
		} catch (error) {
			console.error(
				"Error al eliminar un proveedor de servicios del candidato:",
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
				id_CandidateStatus: new ObjectId(id),
			});
			if (reference.length > 0) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Candidate.findOneAndDelete({
					_id: new ObjectId(id),
				});
				res.status(200).send({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.error("Error al eliminar el documento:", error.message);
			res.status(500).send({ error: "Error al eliminar el documento." });
		} finally {
			next();
		}
	}
}

module.exports = CandidateControllers;
