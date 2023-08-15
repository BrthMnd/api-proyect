const { ObjectId } = require("mongodb");
const {
  ServiceOffersModel,
} = require("../../models/Offers/offers_service.models");

class ServiceOffersControllers {
  getStatus(req, res, next) {
    ServiceOffersModel.find()
      .populate("id_status")
      .populate("id_offers")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Estados" });
      })
      .finally(() => next());
  }

  postStatus(req, res, next) {
    const result = new ServiceOffersModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json({ Error: "ERROR CON ESTADO ***" }))
      .finally(() => next());
  }
  async getIdStatus(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ServiceOffersModel.find({
        _id: new ObjectId(id),
      })
        .populate("id_status")
        .populate("id_offers");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      console.log("eeeror" + error);
    } finally {
      next();
    }
  }
  async putStatus(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await ServiceOffersModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        Update,
        { new: true } // Para obtener el documento actualizado en lugar del antiguo
      );

      if (result) {
        res
          .status(200)
          .json({ message: "Documento actualizado exitosamente\n", result });
      } else {
        res.status(500).json({ error: "Error al actualizar el documento" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
  async deleteStatus(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ServiceOffersModel.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Borrado con exito", result });
      } else {
        res.status(500).send({ error: "Error al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
}
module.exports = { ServiceOffersControllers };
