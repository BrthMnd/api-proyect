const { ObjectId } = require("mongodb");

const {
  PropietarioModels,
} = require("../../models/Inmueble/propietario.models");

class propietarioController {
  getPropietario(req, res, next) {
    PropietarioModels.find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener propietarios" });
      })
      .finally(() => next());
  }
  async getIdPropietario(req, res, next) {
    const id = req.params.id;
    try {
      const result = await PropietarioModels.findOne({
        _id: new ObjectId(id),
      });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("No se encontro ningun coso en el ID ingresado ");
      }
    } catch (error) {
      console.log("error" + error);
    } finally {
      next();
    }
  }
  postPropietario(req, res, next) {
    const result = new PropietarioModels(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res.status(500).json({
          error: "Error al injectar un propietario ",
        })
      )
      .finally(() => next());
  }

  async putPropietario(req, res, next) {
    try {
      const result = await PropietarioModels.findOneAndUpdate(
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

  async deletePropietario(req, res, next) {
    const id = req.params.id;
    try {
      const result = await PropietarioModels.findByIdAndDelete({
        _id: new ObjectId(id),
      });
      if (result) {
        res
          .status(200)
          .send({ message: "Archivo eliminado exitosamente ", result });
      } else {
        res.status(500).send({ error: "Erro al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
}
module.exports = { propietarioController };
