const { ObjectId } = require("mongodb");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models");

class ProveedoresController {
  getProveedores(req, res, next) {
    ProveedoresModels.find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Proveedores" });
      })
      .finally(() => next());
  }

  async getProveedorPorId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ProveedoresModels.find({
        _id: new ObjectId(id),
      });
      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      next();
    }
  }

  //_____________________________________________________________________________________

  postProveedor(req, res, next) {
    const result = new ProveedoresModels(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res.status(500).json({
          error: "Error al injectar un proveedor ", err: error.message
        })
      )
      .finally(() => next());
  }
  //_____________________________________________________________________________________

  async putProveedor(req, res, next) {
    
    const id = req.params.id;

    try {
      const result = await ProveedoresModels.findOneAndUpdate(
        { _id: new ObjectId(id) },
        req.body,
        { new: true }
      );
      if (result) {
        res.status(200).json({ melo: "Documnto actualizado ", result });
      } else {
        res.status(500).json({ error: "Error al actualizar" });
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
