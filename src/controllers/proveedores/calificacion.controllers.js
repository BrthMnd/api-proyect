const { ObjectId } = require("mongodb");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models");
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
          error: "Error al injectar una calificacion ",
          err: error.message,
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

  async promedioCalificacion(req, res, next) {
    try {
      const calificaciones = await CalificacionModel.find({});
      
      if (calificaciones.length === 0) {
        res.status(404).json({ error: "No hay calificaciones disponibles" });
        return;
      }
  
      const sumaCalificaciones = calificaciones.reduce(
        (total, calificacion) => total + calificacion.CalificacionesFloat,
        0
      );
  
      const promedio = sumaCalificaciones / calificaciones.length;
  
      res.status(200).json({ promedio });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al calcular el promedio de calificaciones" });
    } finally {
      next();
    }
  }
  

   //__________________________________________________________________________________________

  async deleteCalificacion(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await ProveedoresModels.find({
        id_calificacion: new ObjectId(id),
      });

      console.log(reference);

      if (reference.length > 0) {
        res.status(500).send({
          error:
            "No se puede eliminar esta categoría, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await CalificacionModel.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Categoría borrada con éxito" });
        } else {
          res.status(500).send({ error: "Error al eliminar la categoría" });
        }
      }
    } catch (error) {
      console.log("Error al eliminar la categoría -> " + error.message);
      res.status(500).send({ error: "Error.", err: error.message });
    } finally {
      next();
    }
  }
}

module.exports = {
  CalificacionesController,
};
