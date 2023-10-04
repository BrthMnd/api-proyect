const { ObjectId } = require("mongodb");
const {
  CalificacionModel,
} = require("../../models/Proveedores/calificacion.models");

class CalificacionesController {
  async getCalificaciones(req, res, next) {
    try {
      const result = await CalificacionModel.find({});

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las calificaciones" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async getCalificacionPorId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await CalificacionModel.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener la calificación" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  postCalificacion(req, res, next) {
    const result = new CalificacionModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res.status(500).json({
          error: "Error al injectar una calificacion ", err: error.message
        })
      )
      .finally(() => next());
  }
  //__________________________________________________________________________________________
  async putCalificacion(req, res, next) {
    
    const id = req.params.id;

    try {
      const result = await CalificacionModel.findOneAndUpdate(
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
  //__________________________________________________________________________________________

  async deleteCalificacion(req, res, next) {
    const id = req.params.id;
    const collection = "calificacion";
    try {
      const result = await CalificacionModel.deleteOne({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Calificación borrada con éxito" });
      } else {
        res.status(500).send({ error: "Error al eliminar la calificación" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error al eliminar la calificación" });
    } finally {
      next();
    }
  }
}

module.exports = {
  CalificacionesController,
};
