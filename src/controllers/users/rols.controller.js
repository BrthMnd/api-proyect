const { ObjectId } = require("mongodb");
const { RolModel } = require("../../models/Users/rols.models.js");
const { UserModel } = require("../../models/Users/users.models.js");

class Rol_Controller {
  Get(req, res, next) {
    RolModel.find({}).populate("id_Permissions")
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
      const result = await RolModel.find({
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

  Post(req, res, next) {
    const result = new RolModel(req.body);
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

  async Put(req, res, next) {
    const id = req.params.id;

    try {
      const result = await RolModel.findOneAndUpdate(
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

  async Delete(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await UserModel.find({
        _id: new ObjectId(id),
      });
      if (reference.length > 0) {
        res.status(409).send({
          error:
            "No se puede eliminar este Rol, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await RolModel.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Rol borrado con éxito" });
        } else {
          res.status(404).send({ error: "Rol no encontrado" });
        }
      }
    } catch (error) {
      console.error("Error al eliminar el Rol -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    } finally {
      next();
    }
  }
}
module.exports = { Rol_Controller };