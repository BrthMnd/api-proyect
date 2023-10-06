const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class PropietarioController {
	async getPropietario(req, res, next) {
		try {
			const result = await db.Propietario.find({});
			res.status(200).json(result);
		} catch (error) {
			console.error("Error al obtener propietarios:", error);
			res.status(500).json({ error: "Error al obtener propietarios" });
		} finally {
			next();
		}
	}

	async getIdPropietario(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Propietario.findOne({
				_id: new ObjectId(id),
			});
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

	async postPropietario(req, res, next) {
		const result = new db.Propietario(req.body);
		try {
			const savedResult = await result.save();
			res.status(201).json(savedResult);
		} catch (error) {
			console.error("Error al insertar un propietario:", error);
			res.status(500).json({ error: "Error al insertar un propietario" });
		} finally {
			next();
		}
	}

	async putPropietario(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Propietario.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				req.body,
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
			console.error("Error al actualizar el documento:", error);
		} finally {
			next();
		}
	}

	async deletePropietario(req, res, next) {
		const id = req.params.id;
		try {
			const reference = await db.Inmueble.find({
				id_propietario: new ObjectId(id),
			});
			if (reference.length > 0) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Propietario.findOneAndDelete({
					_id: new ObjectId(id),
				});
				res.status(200).send({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.error("Error al eliminar el documento:", error);
			res.status(500).send({ error: "Error al eliminar el documento." });
		} finally {
			next();
		}
	}
}

module.exports = PropietarioController;
