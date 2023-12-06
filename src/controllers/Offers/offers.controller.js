const { ObjectId } = require("mongodb");
const { OffersModel } = require("../../models/Offers/offers.model");
const { CandidateModel } = require("../../models/Offers/candidate.model");
const { ContractingModal } = require("../../models/Offers/contracting.model");
const { InmuebleModels } = require("../../models/Inmueble/inmueble.models");
const { CategoriaModel } = require("../../models/Proveedores/categoria.models");

class OffersControllers {
  async Get(req, res, next) {
    try {
      const response_offers = await OffersModel.find()
        .populate("id_property")
        .populate("id_Category_service")
      const response_candidate = await CandidateModel.find()
        .populate("id_offers")
        .populate("id_ServiceProvider")
      res.status(200).json({ response_offers, response_candidate });
    } catch (error) {
      res.status(400).json({
        type: "Bad",
        Error: error,
      });
    }
  }

  async Post(req, res, next) {
    try {
      const response_offers = new OffersModel(req.body);
      const data_offers = await response_offers.save();

      const response_candidate = new CandidateModel({
        id_offers: new ObjectId(data_offers._id),
      });
      const data_candidate = await response_candidate.save();
      res.status(201).json({
        type: "Created",
        offers: data_offers,
        Candidate: data_candidate,
      });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.Nombre_Servicio
      ) {
        res.status(409).json({
          error: "El nombre del estado ya esta en uso",
        });
      } else {
        error;
        res.status(500).json({ error: "Error al crear el documento" });
      }
    }
  }
  async GetId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await OffersModel.find({
        _id: new ObjectId(id),
      })
        .populate("id_property")
        .populate("id_Category_service");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      "Error al Obtener Datos por 'ID' >>>" + error.message;
    }
  }
  async Put(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await OffersModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        Update,
        { new: true }
      );

      if (result) {
        res
          .status(200)
          .json({ message: "Documento actualizado exitosamente\n", result });
      } else {
        res.status(500).json({ error: "Error al actualizar el documento" });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el documento",
        err: error.message,
      });
      error.message;
    }
  }
  async GetModalData(req, res, next) {
    try {
      const response_service = await CategoriaModel.find();
      const response_property = await InmuebleModels.find();
      ({
        service: response_service,
        property: response_property,
      });
      res.status(200).json({
        service: response_service,
        property: response_property,
      });
    } catch (error) {
      error;
      res.status(400).json({
        error: error,
      });
    }
  }
  async Delete_CandidateAndOffers(req, res, next) {
    const id = req.params.id;

    try {
      const response_contract = await ContractingModal.findOne({
        id_offers: new ObjectId(id),
      });
      if (response_contract) {
        res.status(200).send({
          message:
            "No se pudo eliminar porque esta siendo utilizado en un contrato",
        });
      } else {
        const response_Candidate = await CandidateModel.findOneAndDelete({
          id_offers: new ObjectId(id),
        });
        const response_offers = await OffersModel.findOneAndDelete({
          _id: new ObjectId(id),
        });
        res.status(200).send({
          message: "Borrados con éxito",
          Candidate: response_Candidate,
          Offers: response_offers,
        });
      }
    } catch (error) {
      "Error al eliminar el documento -> " + error.message;
      res.status(500).send({
        error: "error.",
        err: error.message,
      });
    }
  }
  async GetId_CandidateForOffers(req, res, next) {
    const id = req.params.id;
    try {
      const result = await CandidateModel.findOne({
        id_offers: new ObjectId(id),
      })
        .populate("id_offers")
        .populate("id_ServiceProvider")
        // .populate("id_calificacion");
      result;
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      "error" + error.message;
    }
  }
  async Add_provider_for_offer(req, res, next) {
    const id = req.params.id;
    try {
      const result = await CandidateModel.findOneAndUpdate(
        { id_offers: new ObjectId(id) },
        { $addToSet: { id_ServiceProvider: id_ServiceProvider } },
        { new: true }
      )
        .populate("id_offers")
        .populate("id_ServiceProvider")
        .populate("id_CandidateStatus");
      result;
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      "error" + error.message;
    }
  }
}
module.exports = { OffersControllers };
