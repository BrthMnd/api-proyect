const { ObjectId } = require("mongodb");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models");

class ProveedoresController {
  getProveedores(req, res, next) {
    ProveedoresModels.find({})
    .populate("id_calificacion")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener Estados", err: error.message });
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
      .catch((error) => res.status(500).json({ Error: "ERROR CON ESTADO ***", err: error.message }))
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
    const collection = "proveedor";
    try {
      const result = await ProveedoresModels.deleteOne({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Borrado con éxito" });
      } else {
        res.status(500).send({ error: "Error al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
}

module.exports = {
  ProveedoresController,
};
