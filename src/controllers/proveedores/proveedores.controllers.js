
  const { ObjectId } = require("mongodb");
  const {
    ProveedoresModels,
  } = require("../../models/Proveedores/provedores.models");

  const { CandidateModel } = require("../../models/Offers/candidate.model");

  class ProveedoresController {
    getProveedores(req, res, next) {
      ProveedoresModels.find({})
        .populate("id_calificacion")
        .populate("categoriaServicio")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res
            .status(500)
            .json({ error: "Error al obtener Estados", err: error.message });
        })
        .finally(() => next());
    }

  async getProveedorPorId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ProveedoresModels.find({
        _id: new ObjectId(id),
      })
        .populate("id_calificacion")
        .populate("categoriaServicio");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      console.log("error" + error);
    } finally {
      next();
    }
  }

  //_____________________________________________________________________________________

  async postProveedor(req, res, next) {
    const { nombre, documento, telefono, email, direccion, categoriaServicio } =
      req.body;

    try {
      const nuevoProveedor = new ProveedoresModels({
        nombre,
        documento,
        telefono,
        email,
        direccion,
        categoriaServicio: categoriaServicio,
      });

      const proveedorCreado = await nuevoProveedor.save();
      res.status(200).json({
        result: proveedorCreado,
        message: "Proveedor creado con éxito",
      });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.documento
      ) {
        res.status(409).json({
          error: "Documento duplicado, el proveedor ya existe.",
          err: error.message,
        });
      } else {
        res
          .status(500)
          .json({ error: "Error al crear el proveedor", err: error.message });
      }
    } finally {
      next();
    }
  }

  //_____________________________________________________________________________________

  async putProveedor(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    Update.categorias = req.body.categorias;
    try {
      const existingProvider = await ProveedoresModels.findOne({
        documento: Update.documento,
      });
      if (existingProvider && existingProvider._id.toString() !== id) {
        return res.status(409).json({
          error: "Documento duplicado, el proveedor ya existe.",
        });
      }
      const result = await ProveedoresModels.findOneAndUpdate(
        { _id: new ObjectId(id) },
        Update,
        { new: true }
      );

      if (result) {
        res
          .status(200)
          .json({ message: "Proveedor actualizado exitosamente\n", result });
      } else {
        res.status(500).json({ error: "Error al actualizar el proveedor" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }

  //_____________________________________________________________________________________

  async deleteProveedor(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await CandidateModel.find({
        id_ServiceProvider: new ObjectId(id),
      });

      console.log(reference);

      if (reference.length > 0) {
        res.status(500).send({
          error:
            "No se puede eliminar este proveedor, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await ProveedoresModels.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Proveedor borrado con éxito" });
        } else {
          res.status(500).send({ error: "Error al eliminar proveedor" });
        }
      }
    } catch (error) {
      console.log("Error al eliminar proveedor -> " + error.message);
      res.status(500).send({ error: "Error.", err: error.message });
    } finally {
      next();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7////

  async AggregateNewCalificacion(req, res, next) {
    const { id_calificacion } = req.body;
    const proveedor_id = req.params.id;
    try {
      const result = await ProveedoresModels.findByIdAndUpdate(
        proveedor_id,
        { $addToSet: { id_calificacion: id_calificacion } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Proveedor no encontrado.", err: error.message });
    } finally {
      next();
    }
  }

  /////////////////////////////////////////////////////////////

  async EliminateCalificacion(req, res, next) {
    const delete_calificacion = req.body.id_calificacion;
    const proveedor_id = req.params.id;
    try {
      const result = await ProveedoresModels.findByIdAndUpdate(
        proveedor_id,
        { $pull: { id_calificacion: delete_calificacion } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      next();
    }
  }

  //___________________________________________Metodos_Categoria________________________

  async addCategoriasServicio(req, res, next) {
    const { categoriaServicio } = req.body;
    const proveedor_id = req.params.id;
    try {
      const result = await ProveedoresModels.findByIdAndUpdate(
        proveedor_id,
        { $addToSet: { categoriaServicio: categoriaServicio } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: "Error al agregar categorías de servicio",
        err: error.message,
      });
    } finally {
      next();
    }
  }

  async eliminateCategoriasServicio(req, res, next) {
    const delete_categoria = req.body.categoriaServicio;
    const proveedor_id = req.params.id;
    try {
      const result = await ProveedoresModels.findByIdAndUpdate(
        proveedor_id,
        { $pull: { categoriaServicio: delete_categoria } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: "Error al eliminar categorías de servicio",
        err: error.message,
      });
    } finally {
      next();
    }
  }
}

module.exports = {
  ProveedoresController,
};
