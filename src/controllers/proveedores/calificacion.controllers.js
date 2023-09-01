const { ObjectId } = require("mongodb");
const {
  CalificacionModel,
} = require("../../models/Proveedores/calificacion.models");

class CalificacionesController {
  async getCalificaciones(req, res) {
    //const db = new DatabaseConnector();
    try {
      const result = await CalificacionModel.find({}).exec();

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las calificaciones" });
    } finally {
      next();
    }
  }

  async getCalificacionPorId(req, res, next) {
    // const db = new DatabaseConnector();
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
    }
  }

  async postCalificacion(req, res) {
    const { Comentarios, CalificacionesFloat } = req.body;
    // const db = new DatabaseConnector();
    const collection = "calificacion";
    try {
      await db.connect();
      const result = await CalificacionModel.insertOne({
        Comentarios: Comentarios,
        CalificacionesFloat: CalificacionesFloat,
      });

      if (result) {
        res.status(200).json({ message: "Calificación creada exitosamente" });
      } else {
        res.status(500).json({ error: "Error al crear la calificación" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear la calificación" });
    } finally {
      db.close();
    }
  }

  async putCalificacion(req, res, next) {
    const { Comentarios, CalificacionesFloat } = req.body;
    const id = req.params.id;
    // const db = new DatabaseConnector();
    const collection = "calificacion";
    try {
      const result = await CalificacionModel.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            Comentarios: Comentarios,
            CalificacionesFloat: CalificacionesFloat,
          },
        }
      );
      if (result.modifiedCount === 1) {
        res
          .status(200)
          .json({ message: "Calificación actualizada exitosamente" });
      } else {
        res.status(500).json({ error: "Error al actualizar la calificación" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar la calificación" });
    } finally {
      db.close();
    }
  }

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
      db.close();
    }
  }
}

module.exports = {
  CalificacionesController,
};
