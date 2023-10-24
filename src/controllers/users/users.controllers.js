const { ObjectId } = require("mongodb");
const { UserModel } = require("../../models/Users/users.models.js");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
class User_Controller {
  Get(req, res, next) {
    UserModel.find({})
      .populate("Rols")
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
      const result = await UserModel.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener el usuario" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  Post(req, res, next) {
    const result = new UserModel(req.body);
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
      const result = await UserModel.findOneAndUpdate(
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
      const result = await UserModel.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Rol borrado con éxito" });
      } else {
        res.status(404).send({ error: "Rol no encontrado" });
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
  async register(req, res, next) {
    const { password, userName, Rols } = req.body;
    // console.log(req.body);
    try {
      const passwordHash = await bycrypt.hash(password, 10);
      const Result = `El usuario ${userName} tiene una contraseña: ${password}, que fue codificada: ${passwordHash}`
      res.status(200).json({ result: "Good", message: Result });
    } catch (error) {
      res.status(500).json({ result: error });
      console.log(error);
    }
  }
}
module.exports = { User_Controller };
