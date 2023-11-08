const { ObjectId } = require("mongodb");
const { OffersModel } = require("../../models/Offers/offers.model");
const { CandidateModel } = require("../../models/Offers/candidate.model");
const { ContractingModal } = require("../../models/Offers/contracting.model");
const { UserModel } = require("../../models/Users/users.models");
const { ServicioModels } = require("../../models/Proveedores/servicios.models");
const {
  PropietarioModels,
} = require("../../models/Inmueble/propietario.models");
const { InmuebleModels } = require("../../models/Inmueble/inmueble.models");
const { OffersStatus_Model } = require("../../models/Offers/OfferStatus");

class OffersControllers {
  async Get(req, res, next) {
    try {
      const response_offers = await OffersModel.find()
        .populate("id_property")
        .populate("id_service")
        .populate("id_OfferStatus");

      res.status(200).send(response_offers);
    } catch (error) {
      res.status(400).json({
        type: "Bad",
        Error: error,
      });
    } finally {
      next();
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
        console.log(error);
        res.status(500).json({ error: "Error al crear el documento" });
      }
    } finally {
      next();
    }
  }
  async GetId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await OffersModel.find({
        _id: new ObjectId(id),
      })
        .populate("id_property")
        .populate("id_service");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      console.log("Error al Obtener Datos por 'ID' >>>" + error.message);
    } finally {
      next();
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
      console.log(error.message);
    } finally {
      next();
    }
  }
  async GetModalData(req, res, next) {
    try {
      const response_service = await ServicioModels.find();
      const response_property = await InmuebleModels.find();
      const response_offerStatus = await OffersStatus_Model.find();
      console.log({
        service: response_service,
        property: response_property,
        offerStatus: response_offerStatus,
      });
      res.status(200).json({
        service: response_service,
        property: response_property,
        offerStatus: response_offerStatus,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    } finally {
      next();
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
      console.log("Error al eliminar el documento -> " + error.message);
      res.status(500).send({
        error: "error.",
        err: error.message,
      });
    } finally {
      next();
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
        .populate("id_CandidateStatus");
      console.log(result);
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      console.log("error" + error.message);
    } finally {
      next();
    }
  }
}
module.exports = { OffersControllers };
