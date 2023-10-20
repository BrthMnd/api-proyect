const { ObjectId } = require("mongodb");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models");

const { CandidateModel } = require("../../models/Offers/candidate.model");

class ProveedoresController {
  getProveedores(req, res, next) {
    ProveedoresModels.find({})
      .populate("id_calificacion")
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
      }).populate("id_calificacion");
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

  postProveedor(req, res, next) {
    const result = new ProveedoresModels(req.body);
    result
      .save()
      .then((data) =>
        res.status(201).json({ result: data, message: "Created" })
      )
      .catch((error) =>
        res
          .status(500)
          .json({ Error: "ERROR CON ESTADO ***", err: error.message })
      )
      .finally(() => next());
  }
  //_____________________________________________________________________________________

  async putProveedor(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await ProveedoresModels.findOneAndUpdate(
        { _id: new ObjectId(id) },
        Update,
        { new: true } // Para obtener el documento actualizado en lugar del antiguo
      );

      if (result) {
        res
          .status(200)
          .json({ message: "Documento actualizado exitosamente\n", result });
      } else {
        res.status(500).json({ error: "Error al actualizar el documento" });
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


  
}










module.exports = {
  ProveedoresController,
};
