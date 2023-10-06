const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class ProveedoresController {
	async getProveedores(req, res, next) {
		try {
			const proveedores = await db.Proveedores.find({});
			res.status(200).json(proveedores);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al obtener proveedores" });
		}
	}

	async getProveedorPorId(req, res, next) {
		const id = req.params.id;

		try {
			const proveedor = await db.Proveedores.findById(id);

			if (!proveedor) {
				return res
					.status(404)
					.json({ error: "Proveedor no encontrado" });
			}

			res.status(200).json(proveedor);
		} catch (error) {
			console.error("Error: " + error);
			res.status(500).json({ error: "Error al obtener el proveedor" });
		}
	}

	async postProveedor(req, res, next) {
		const { Nombre, Apellido, Telefono, Email, Direccion } = req.body;

		try {
			const proveedor = new db.Proveedores({
				Nombre,
				Apellido,
				Telefono,
				Email,
				Direccion,
			});

			await proveedor.save();

			res.status(201).json({ message: "Proveedor creado exitosamente" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al crear el proveedor" });
		}
	}

	async putProveedor(req, res, next) {
		const id = req.params.id;

		try {
			const updatedProveedor = await db.Proveedores.findByIdAndUpdate(
				id,
				req.body,
				{
					new: true,
				}
			);

			if (!updatedProveedor) {
				return res
					.status(404)
					.json({ error: "Proveedor no encontrado" });
			}

			res.status(200).json({
				message: "Proveedor actualizado exitosamente",
				Resultado: updatedProveedor,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Error al actualizar el proveedor" });
		}
	}

	async deleteProveedor(req, res, next) {
		const id = req.params.id;

		try {
			const result = await db.Proveedores.findByIdAndDelete(id);

			if (!result) {
				return res
					.status(404)
					.json({ error: "Proveedor no encontrado" });
			}

			res.status(200).json({ message: "Proveedor eliminado con éxito" });
		} catch (error) {
			console.error("Error al eliminar el proveedor -> " + error.message);
			res.status(500).json({ error: "Error al eliminar el proveedor" });
		}
	}
}

module.exports = ProveedoresController;
