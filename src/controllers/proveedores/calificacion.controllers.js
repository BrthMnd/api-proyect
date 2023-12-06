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
      error;
      res.status(500).json({ error: "Error al obtener las calificaciones" });
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
      "Error: " + error;
      res.status(500).json({ error: "Error al obtener la calificación" });
    }
  }

  //__________________________________________________________________________________________

  postCalificacion(req, res, next) {
    const proveedorId = req.body.id_proveedor;

    ProveedoresModels.findById(proveedorId)
      .then((proveedor) => {
        if (!proveedor) {
          return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        const calificacion = new CalificacionModel(req.body);
        calificacion.proveedor = proveedorId;

        calificacion
          .save()
          .then((result) => {
            proveedor.id_calificacion.push(result._id);

            return proveedor.save();
          })
          .then(() =>
            res
              .status(201)
              .json({ message: "Calificación insertada exitosamente" })
          )
          .catch((error) => {
            console.error("Error al insertar una calificación:", error);
            res.status(500).json({
              error: "Error al insertar una calificación",
              err: error.message,
            });
          });
      })
      .catch((error) => {
        console.error("Error al buscar el proveedor:", error);
        res.status(500).json({
          error: "Error al buscar el proveedor",
          err: error.message,
        });
      });
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
      error;
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
      error;
      res
        .status(500)
        .json({ error: "Error al calcular el promedio de calificaciones" });
    }
  }

  //__________________________________________________________________________________________

  async deleteCalificacion(req, res, next) {
    const calificacionId = req.params.id;

    try {
      await ProveedoresModels.updateMany(
        { "id_calificacion._id": new ObjectId(calificacionId) },
        { $pull: { id_calificacion: { _id: new ObjectId(calificacionId) } } }
      );

      const result = await CalificacionModel.findOneAndDelete({
        _id: new ObjectId(calificacionId),
      });

      if (result) {
        res.status(200).send({ message: "Calificación borrada con éxito" });
      } else {
        res.status(500).send({ error: "Error al eliminar la calificación" });
      }
    } catch (error) {
      console.error("Error al eliminar la calificación -> " + error.message);
      res.status(500).send({ error: "Error al eliminar la calificación." });
    }
  }
}
module.exports = {
  CalificacionesController,
};
