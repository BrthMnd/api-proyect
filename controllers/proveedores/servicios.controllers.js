const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class ServiciosController {
	async getServicios(req, res, next) {
		try {
			const servicios = await db.Servicios.find({}).populate(
				"Categoria_Servicio"
			);
			res.status(200).send(servicios);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al obtener servicios" });
		}
	}

	async getServicioPorId(req, res, next) {
		const id = req.params.id;

		try {
			const servicio = await db.Servicios.findById(id).populate(
				"Categoria_Servicio"
			);

			if (!servicio) {
				return res
					.status(404)
					.json({ error: "Servicio no encontrado" });
			}

			res.status(200).json(servicio);
		} catch (error) {
			console.error("Error: " + error);
			res.status(500).json({ error: "Error al obtener el servicio" });
		}
	}

	async postServicio(req, res, next) {
		try {
			const servicio = new db.Servicios(req.body);
			await servicio.save();

			res.status(201).json({ message: "Servicio creado exitosamente" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al crear el servicio" });
		}
	}

	async putServicio(req, res, next) {
		const id = req.params.id;

		try {
			const updatedServicio = await db.Servicios.findByIdAndUpdate(
				id,
				req.body,
				{
					new: true,
				}
			);

			if (!updatedServicio) {
				return res
					.status(404)
					.json({ error: "Servicio no encontrado" });
			}

			res.status(200).json({
				message: "Servicio actualizado exitosamente",
				Resultado: updatedServicio,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al actualizar el servicio" });
		}
	}

	async deleteServicio(req, res, next) {
		const id = req.params.id;

		try {
			const reference = await db.Offers.find({
				id_service: id,
			});

			if (reference.length > 0) {
				return res.status(400).json({
					error:
						"No se puede eliminar este servicio, ya que se utiliza en otra parte.",
				});
			}

			const result = await db.Servicios.findByIdAndDelete(id);

			if (!result) {
				return res
					.status(404)
					.json({ error: "Servicio no encontrado" });
			}

			res.status(200).json({ message: "Servicio eliminado con éxito" });
		} catch (error) {
			console.error("Error al eliminar el servicio -> " + error.message);
			res.status(500).json({ error: "Error al eliminar el servicio" });
		}
	}
}

module.exports = ServiciosController;
