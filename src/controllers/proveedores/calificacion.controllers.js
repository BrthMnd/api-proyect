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
    } 
  }

  //__________________________________________________________________________________________

  // postCalificacion(req, res, next) {
  //   const result = new CalificacionModel(req.body);
  //   result
  //     .save()
  //     .then((result) => res.status(201).json(result))
  //     .catch((error) =>
  //       res.status(500).json({
  //         error: "Error al injectar una calificacion ",
  //         err: error.message,
  //       })
  //     )
      
  // }

  postCalificacion(req, res, next) {
    const proveedorId = req.body.id_proveedor;
  
    ProveedoresModels.findById(proveedorId)
      .then((proveedor) => {
        if (!proveedor) {
          return res.status(404).json({ error: "Proveedor no encontrado" });
        }
  
        const calificacion = new CalificacionModel(req.body);
        calificacion.proveedor = proveedorId;
  
        calificacion.save()
          .then((result) => {
            // Agregar el ID de la calificación al proveedor
            proveedor.id_calificacion.push(result._id);
  
            // Guardar el proveedor con el nuevo ID de calificación
            return proveedor.save();
          })
          .then(() => res.status(201).json({ message: "Calificación insertada exitosamente" }))
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
      console.log(error);
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
            "No se puede eliminar esta calificación, ya que se utiliza en otra parte.",
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
    } 
  }
}

module.exports = {
  CalificacionesController,
};
