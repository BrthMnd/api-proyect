const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class OffersControllers {
	async getStatus(req, res, next) {
		try {
			const result = await db.Offers.find()
				.populate("id_property")
				.populate("id_service");
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener Ofertas:", error);
			res.status(500).json({
				error: "Error al obtener Ofertas",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async postStatus(req, res, next) {
		try {
			const result = await db.Offers.create(req.body);
			res.status(201).json(result);
		} catch (error) {
			console.error("Error al ingresar datos:", error);
			res.status(500).json({
				Error: "Error al ingresar datos",
				err: error.message,
			});
		} finally {
			next();
		}
	}

	async getIdStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Offers.findById(id)
				.populate("id_property")
				.populate("id_service");
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.error("Error al obtener datos por 'ID':", error.message);
		} finally {
			next();
		}
	}

	async putStatus(req, res, next) {
		const id = req.params.id;
		const update = req.body;
		try {
			const result = await db.Offers.findByIdAndUpdate(id, update, {
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
			console.error("Error al actualizar documento:", error.message);
		} finally {
			next();
		}
	}

	async deleteStatus(req, res, next) {
		const id = req.params.id;
		try {
			const reference = await db.Candidate.findOne({ id_offers: id });
			console.log(reference);
			if (reference) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Offers.findByIdAndDelete(id);
				res.status(200).json({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.error("Error al eliminar el documento:", error.message);
			res.status(500).json({
				error: "error",
			});
		} finally {
			next();
		}
	}
}

module.exports = OffersControllers;
