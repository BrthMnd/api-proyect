const { ObjectId } = require("mongodb");
const {
  CategoriaModel,
} = require("../../models/Proveedores/categoria.models.js");
const {
  ServicioModels,
} = require("../../models/Proveedores/servicios.models.js");

class CategoriasController {
  getCategorias(req, res, next) {
    CategoriaModel.find({})
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Cartegorias" });
      });
  }

  // //__________________________________________________________________________________________

  async getCategoriaPorId(req, res, next) {
    const id = req.params.id;

    try {
      const result = await CategoriaModel.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      "Error: " + error;
      res.status(500).json({ error: "Error al obtener la categoría" });
    }
  }

  //__________________________________________________________________________________________

  async postCategoria(req, res, next) {
    const { Nombre_Categoria, Descripcion, estado } = req.body;

    try {
      const categoria = new CategoriaModel({
        Nombre_Categoria: Nombre_Categoria,
        Descripcion: Descripcion,
        Estado: estado,
      });

      const result = await categoria.save();

      res
        .status(200)
        .json({ message: "Categoría creada exitosamente", Resultado: result });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.Nombre_Categoria
      ) {
        res.status(409).json({
          error: "El nombre de categoría ya existe en la base de datos",
        });
      } else {
        error;
        res.status(500).json({ error: "Error al crear la categoría" });
      }
    }
  }

  //__________________________________________________________________________________________

  async putCategoria(req, res, next) {
    const id = req.params.id;
    const updatedData = req.body;
    try {
      const categoria = await CategoriaModel.findOne({ _id: new ObjectId(id) });
      if (updatedData.estado !== categoria.estado) {
        const servicios = await ServicioModels.find({
          Categoria_Servicio: new ObjectId(id),
        });

        for (const servicio of servicios) {
          await ServicioModels.updateOne(
            { _id: servicio._id },
            { $set: { estado: updatedData.estado } }
          );
        }
      }

      const result = await CategoriaModel.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Categoría actualizada exitosamente" });
      } else {
        res.status(500).json({ message: "Error al actualizar la categoría" });
      }
    } catch (error) {
      error;
      res
        .status(500)
        .json({ message: "Error al actualizar la categoría", err: error });
    }
  }

  //__________________________________________________________________________________________

  async deleteCategoria(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await ServicioModels.find({
        Categoria_Servicio: new ObjectId(id),
      });

      if (reference.length > 0) {
        res.status(409).send({
          error:
            "No se puede eliminar esta categoría, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await CategoriaModel.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Categoría borrada con éxito" });
        } else {
          res.status(404).send({ error: "Categoría no encontrada" });
        }
      }
    } catch (error) {
      console.error("Error al eliminar la categoría -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    }
  }
}

module.exports = { CategoriasController };
