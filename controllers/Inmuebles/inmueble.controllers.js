const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class InmuebleControllers {
	async getInmueble(req, res, next) {
		try {
			const result = await db.Inmueble.find({})
				.populate("id_propietario")
				.populate("id_encargado");
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener Estados:", error);
			res.status(500).json({ error: "Error al obtener Estados" });
		} finally {
			next();
		}
	}

	async postInmueble(req, res, next) {
		const result = new db.Inmueble(req.body);
		try {
			const savedResult = await result.save();
			res.status(201).json({ result: savedResult, message: "Created" });
		} catch (error) {
			console.error("Error al insertar:", error);
			res.status(500).json({ Error: "ERROR CON ESTADO ***" });
		} finally {
			next();
		}
	}

	async getIdInmueble(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Inmueble.findOne({
				_id: new ObjectId(id),
			}).populate("id_propietario id_encargado");
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

	async putInmueble(req, res, next) {
		const id = req.params.id;
		const update = req.body;

		try {
			const result = await db.Inmueble.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				update,
				{ new: true }
			);

			if (result) {
				res.status(200).json({
					message: "Documento actualizado exitosamente\n",
					result,
				});
			} else {
				res.status(500).json({
					error: "Error al actualizar el documento",
				});
			}
		} catch (error) {
			console.error("Error al actualizar el documento:", error);
		} finally {
			next();
		}
	}

	async deleteInmueble(req, res, next) {
		const id = req.params.id;

		try {
			const reference = await db.Offers.findOne({
				id_property: new ObjectId(id),
			});

			if (reference) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Inmueble.findOneAndDelete({
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

module.exports = InmuebleControllers;
