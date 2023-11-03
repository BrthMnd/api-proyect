const { ObjectId } = require("mongodb");
const { Employed_Model } = require("../../models/Users/employed.models.js");
const { UserModel } = require("../../models/Users/users.models.js");
const bycrypt = require("bcrypt");
class Employed_Controller {
  Get(req, res, next) {
    Employed_Model.find({})
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener el Empleado", error });
      })
      .finally(() => next());
  }

  // //__________________________________________________________________________________________

  async GetById(req, res, next) {
    const id = req.params.id;

    try {
      const result = await Employed_Model.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener el Empleado" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async Post(req, res, next) {
    const {
      email,
      password,
      Nombre,
      Apellido,
      Documento,
      Telefono,
      Direccion,
    } = req.body;
    try {
      const passwordHash = await bycrypt.hash(password, 10);
      const employed = new Employed_Model({
        Nombre,
        Apellido,
        Documento,
        Telefono,
        Direccion,
      });
      const employed_created = await employed.save();

      if (!employed_created)
        return res.status(400).send("error al crear empleado");

      const user = UserModel({
        email,
        password: passwordHash,
        role: "Employed",
        roleRef: new ObjectId(employed_created._id),
      });
      const user_created = await user.save();

      if (!user_created) return res.status(400).send("hubo algún error");

      res.status(201).json({
        message: "GOOD",
        Employed: employed_created,
        User: user_created,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  //put no terminado
  async Put(req, res, next) {
    const id = req.params.id;

    try {
      const result = await Employed_Model.findOneAndUpdate(
        { _id: new ObjectId(id) },
        req.body,
        { new: true }
      );
      if (result) {
        res.status(200).json({ message: "Empleado actualizado ", result });
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
      const result = await Employed_Model.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Empleado borrado con éxito" });
      } else {
        res.status(404).send({ error: "Empleado no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar el Empleado -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    } finally {
      next();
    }
  }
}
module.exports = { Employed_Controller };
