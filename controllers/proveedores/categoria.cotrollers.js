const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class CategoriasController {
	async getCategorias(req, res, next) {
		try {
			const categorias = await db.Categoria.find({});
			res.status(200).send(categorias);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al obtener categorías" });
		} finally {
			next();
		}
	}

	async getCategoriaPorId(req, res, next) {
		const id = req.params.id;

		try {
			const categoria = await db.Categoria.findById(id);

			if (!categoria) {
				return res
					.status(404)
					.json({ error: "Categoría no encontrada" });
			}

			res.status(200).send(categoria);
		} catch (error) {
			console.error("Error: " + error);
			res.status(500).json({ error: "Error al obtener la categoría" });
		} finally {
			next();
		}
	}

	async postCategoria(req, res, next) {
		const { Nombre_Categoria, Descripcion, Estado } = req.body;

		try {
			const categoria = new db.Categoria({
				Nombre_Categoria,
				Descripcion,
				Estado,
			});

			const result = await categoria.save();

			res.status(201).json({
				message: "Categoría creada exitosamente",
				Resultado: result,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al crear la categoría" });
		} finally {
			next();
		}
	}

	async putCategoria(req, res, next) {
		const id = req.params.id;

		try {
			const updatedCategoria = await db.Categoria.findByIdAndUpdate(
				id,
				req.body,
				{ new: true }
			);

			if (!updatedCategoria) {
				return res
					.status(404)
					.json({ error: "Categoría no encontrada" });
			}

			res.status(200).json({
				message: "Categoría actualizada exitosamente",
				Resultado: updatedCategoria,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al actualizar la categoría" });
		} finally {
			next();
		}
	}

	async deleteCategoria(req, res, next) {
		const id = req.params.id;

		try {
			const reference = await db.Servicio.findOne({
				Categoria_Servicio: id,
			});

			if (reference) {
				return res.status(500).send({
					error:
						"No se puede eliminar esta categoría, ya que se utiliza en otra parte.",
				});
			}

			const deletedCategoria = await db.Categoria.findByIdAndDelete(id);

			if (!deletedCategoria) {
				return res
					.status(404)
					.json({ error: "Categoría no encontrada" });
			}

			res.status(200).json({
				message: "Categoría borrada con éxito",
			});
		} catch (error) {
			console.error("Error al eliminar la categoría -> " + error.message);
			res.status(500).send({ error: "Error al eliminar la categoría" });
		} finally {
			next();
		}
	}
}

module.exports = CategoriasController;
