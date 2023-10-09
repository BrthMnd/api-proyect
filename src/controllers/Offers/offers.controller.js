const { ObjectId } = require("mongodb");
const { OffersModel } = require("../../models/Offers/offers.model");
const { CandidateModel } = require("../../models/Offers/candidate.model");

class OffersControllers {
  getStatus(req, res, next) {
    OffersModel.find()
      .populate("id_property")
      .populate("id_service")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Ofertas", err: error });
      })
      .finally(() => next());
  }

  async postStatus(req, res, next) {
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
      res.status(500).json({
        Error: "*** Error al Ingresar datos ***",
        err: error.message,
      });
    } finally {
      next();
    }
  }
  async getIdStatus(req, res, next) {
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
  async putStatus(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await OffersModel.findOneAndUpdate(
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
      res.status(500).json({
        error: "Error al actualizar el documento",
        err: error.message,
      });
      console.log(error.message);
    } finally {
      next();
    }
  }
  async deleteCandidateAndOffers(req, res, next) {
    const id = req.params.id;

    try {
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
  async getIdCandidateForOffers(req, res, next) {
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
