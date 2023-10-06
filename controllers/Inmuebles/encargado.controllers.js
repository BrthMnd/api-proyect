const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class EncargadoControllers {
	async getEncargado(req, res, next) {
		try {
			const result = await db.Encargado.find({});
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener datos:", error);
			res.status(500).json({ error: "Error al obtener datos" });
		} finally {
			next();
		}
	}

	async postEncargado(req, res, next) {
		const result = new db.Encargado(req.body);
		try {
			const savedResult = await result.save();
			res.status(200).json(savedResult);
		} catch (error) {
			console.error("Error al insertar:", error);
			res.status(500).json({ error: "Error al insertar" });
		} finally {
			next();
		}
	}

	async getIdEncargado(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Encargado.findOne({
				_id: new ObjectId(id),
			});
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send("No se encontró nada en el ID ingresado");
			}
		} catch (error) {
			console.error("Error al buscar por ID:", error);
		} finally {
			next();
		}
	}

	async putEncargado(req, res, next) {
		const id = req.params.id;
		const update = req.body;

		try {
			const result = await db.Encargado.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				update,
				{ new: true }
			);
			if (result) {
				res.status(200).json({
					message: "Documento actualizado con éxito",
					result,
				});
			} else {
				res.status(500).json({
					error: "Error al actualizar documento",
				});
			}
		} catch (error) {
			console.error("Error al actualizar documento:", error);
		} finally {
			next();
		}
	}

	async deleteEncargado(req, res, next) {
		const id = req.params.id;

		try {
			const reference = await db.Encargado.findOne({
				_id: new ObjectId(id),
			});

			if (reference) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Encargado.findOneAndDelete({
					_id: new ObjectId(id),
				});
				res.status(200).send({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.error("Error al eliminar el documento:", error);
			res.status(500).send({
				error: "Error al eliminar el documento.",
			});
		} finally {
			next();
		}
	}
}

module.exports = EncargadoControllers;
