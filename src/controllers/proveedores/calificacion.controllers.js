const { ObjectId } = require("mongodb");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models");
const {
  CalificacionModel,
} = require("../../models/Proveedores/calificacion.models");
const { ContractingModal } = require("../../models/Offers/contracting.model");
const { UserModel } = require("../../models/Users/users.models");
const { OffersModel } = require("../../models/Offers/offers.model");

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

  async postCalificacion(req, res, next) {
    const data = req.body;

    try {
      const contract = await ContractingModal.findOne({ id_offers: data.id });

      const proveedor = await ProveedoresModels.findById(contract.id_provider);
      if (!proveedor) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }
      const rating = new CalificacionModel({
        Comentarios: data.Comentarios,
        CalificacionesFloat: data.CalificacionesFloat,
      });
      const rating_save = await rating.save();
      if (!rating_save) {
        return res.status(400).json({ message: "error al crear calificacion" });
      }
      proveedor.id_calificacion.push(rating_save._id);
      const insertRating = await proveedor.save();
      if (!insertRating) {
        return res
          .status(400)
          .json({ message: "Error al insertar la calificacion al proveedor" });
      }
      const user_response = await UserModel.findOneAndUpdate(
        { roleRef: proveedor._id },
        { status: false },
        { new: true }
      );
      if (!user_response) {
        return res
          .status(400)
          .json({ message: "Error al cambiar el estado de usuario." });
      }
      const offer_response = await OffersModel.findOneAndUpdate(
        { _id: data.id },
        { state: "Finalizado", estado: false },
        { new: true }
      );
      res.status(200).json({
        message: "Los datos fueron insertados de forma correcta",
        resultOfInsert: insertRating,
        resultOfUser: user_response,
        resultOfOffers: offer_response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error al buscar el proveedor",
        err: error.message,
      });
    }
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
