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
      })
      .finally(() => next());
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
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener la categoría" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async postCategoria(req, res, next) {
    const { Nombre_Categoria, Descripcion, Estado } = req.body;
    try {
      const categoria = new CategoriaModel({
        Nombre_Categoria: Nombre_Categoria,
        Descripcion: Descripcion,
        Estado: Estado,
      });

      const result = await categoria.save();

      res
        .status(200)
        .json({ message: "Categoría creada exitosamente", Resultado: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear la categoría" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async putCategoria(req, res, next) {
    const id = req.params.id;
    const collection = "categoria";
    try {
      const result = await CategoriaModel.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: req.body,
        }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Categoría actualizada exitosamente" });
      } else {
        res.status(500).json({ error: "Error al actualizar la categoría" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar la categoría" });
    } finally {
      next();
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
        // Si hay servicios relacionados, se envía un código de estado 409 (Conflict)
        res.status(409).send({
          error:
            "No se puede eliminar esta categoría, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await CategoriaModel.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          // Si la eliminación tiene éxito, se envía un código de estado 200 (OK)
          res.status(200).send({ message: "Categoría borrada con éxito" });
        } else {
          // Si no se encuentra la categoría para eliminar, se envía un código de estado 404 (Not Found)
          res.status(404).send({ error: "Categoría no encontrada" });
        }
      }
    } catch (error) {
      console.error("Error al eliminar la categoría -> " + error.message);
      // Para errores internos del servidor, se utiliza el código de estado 500 (Internal Server Error)
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    } finally {
      next();
    }
  }
}

module.exports = { CategoriasController };