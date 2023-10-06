const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class CalificacionesController {
	async getCalificaciones(req, res, next) {
		try {
			const result = await db.Calificacion.find({});
			res.status(200).send(result);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error al obtener las calificaciones",
			});
		} finally {
			next();
		}
	}

	async getCalificacionPorId(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Calificacion.findOne({
				_id: new ObjectId(id),
			});

			if (!result) {
				return res
					.status(404)
					.json({ error: "Calificación no encontrada" });
			}

			res.status(200).send(result);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al obtener la calificación" });
		} finally {
			next();
		}
	}

	async postCalificacion(req, res, next) {
		try {
			const newCalificacion = new db.Calificacion(req.body);
			await newCalificacion.save();

			res.status(201).json({
				message: "Calificación creada exitosamente",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al crear la calificación" });
		} finally {
			next();
		}
	}

	async putCalificacion(req, res, next) {
		const id = req.params.id;
		const { Comentarios, CalificacionesFloat } = req.body;
		try {
			const result = await db.Calificacion.updateOne(
				{ _id: new ObjectId(id) },
				{
					$set: {
						Comentarios,
						CalificacionesFloat,
					},
				}
			);

			if (result.modifiedCount === 1) {
				res.status(200).json({
					message: "Calificación actualizada exitosamente",
				});
			} else {
				res.status(404).json({
					error: "Calificación no encontrada",
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error al actualizar la calificación",
			});
		} finally {
			next();
		}
	}

	async deleteCalificacion(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Calificacion.deleteOne({
				_id: new ObjectId(id),
			});

			if (result.deletedCount === 1) {
				res.status(200).send({
					message: "Calificación eliminada con éxito",
				});
			} else {
				res.status(404).json({
					error: "Calificación no encontrada",
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error al eliminar la calificación",
			});
		} finally {
			next();
		}
	}
}

module.exports = CalificacionesController;
