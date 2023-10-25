const { ObjectId } = require("mongodb");
const {
  PermissionModel
} = require("../../models/Users/permissions.models.js");

const { RolModel } = require("../../models/Users/rols.models.js")

class PermissionController {
  Get(req, res, next) {
    PermissionModel.find({})
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener el permiso" });
      })
      .finally(() => next());
  }

  // //__________________________________________________________________________________________

  async GetById(req, res, next) {
    const id = req.params.id;

    try {
      const result = await PermissionModel.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener el permiso" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  postPermission(req, res, next) {
    const result = new PermissionModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res.status(500).json({
          error: "Error al agregar un permiso ",
          err: error.message,
        })
      )
      .finally(() => next());
  }

  //__________________________________________________________________________________________

  async putPermission(req, res, next) {
    const id = req.params.id;

    try {
      const result = await PermissionModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        req.body,
        { new: true }
      );
      if (result) {
        res.status(200).json({ melo: "Permiso actualizado ", result });
      } else {
        res.status(500).json({ error: "Error al actualizar" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async deletePermission(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await RolModel.find({
        id_Permissions: new ObjectId(id),
      });
      if (reference.length > 0) {
        res.status(409).send({
          error:
            "No se puede eliminar este permiso, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await PermissionModel.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Permiso borrado con éxito" });
        } else {
          res.status(404).send({ error: "Permiso no encontrado" });
        }
      }
    } catch (error) {
      console.error("Error al eliminar el permiso -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    } finally {
      next();
    }
  }
}
module.exports = { PermissionController };