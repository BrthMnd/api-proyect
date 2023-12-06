const { ObjectId } = require("mongodb");
const { CandidateModel } = require("../../models/Offers/candidate.model");
const { ContractingModal } = require("../../models/Offers/contracting.model");
const { OffersModel } = require("../../models/Offers/offers.model");

class Candidate_Controllers {
  Get(req, res, next) {
    CandidateModel.find()
      .populate("id_offers")
      .populate("id_ServiceProvider")
      .populate("id_CandidateStatus")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Error al obtener Estados", err: error.message });
      });
  }
  Post(req, res, next) {
    const result = new CandidateModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res
          .status(500)
          .json({ Error: "ERROR CON ESTADO ***", err: error.message })
      );
  }
  async GetId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await CandidateModel.find({
        _id: new ObjectId(id),
      })
        .populate("id_offers")
        .populate("id_ServiceProvider")
        .populate("id_CandidateStatus");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      "error" + error;
    }
  }

  async Put(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await CandidateModel.findOneAndUpdate(
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
      error.message;
    }
  }
  async AggregateNewCandidate(req, res, next) {
    const { id_ServiceProvider } = req.body;
    const offersId = req.params.id;
    "proveedor: " + id_ServiceProvider;
    "oferta: " + offersId;

    try {
      const result = await CandidateModel.findOneAndUpdate(
        { id_offers: new ObjectId(offersId) },
        { $addToSet: { id_ServiceProvider: new ObjectId(id_ServiceProvider) } },
        { new: true }
      );
      if (!result)
        return res.status(404).json({ error: "Candidato no encontrado." });
      result;
      res.status(200).json(result);
    } catch (error) {
      error;
      return res
        .status(500)
        .json({ error: "Candidato no encontrado.", err: error.message });
    }
  }
  async SelectCandidate(req, res, next) {
    const { selectedCandidate } = req.body;
    const candidateId = req.params.id;
    try {
      const result = await CandidateModel.findByIdAndUpdate(
        candidateId,
        { selectedCandidate: selectedCandidate },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Candidato no seleccionado." });
      }
      res.status(200).json(result);
    } catch (error) {
      error.message;
      return res
        .status(500)
        .json({ error: "Candidato no seleccionado.", err: error.message });
    }
  }
  async EliminateCandidate(req, res, next) {
    const serviceProviderIdToDelete = req.body.id_ServiceProvider;
    const offersId = req.params.id;
    try {
      const result = await CandidateModel.findOneAndUpdate(
        { id_offers: new ObjectId(offersId) },
        { $pull: { id_ServiceProvider: serviceProviderIdToDelete } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Candidato no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      error.message;
    }
  }
  async Delete(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await ContractingModal.find({
        id_CandidateStatus: new ObjectId(id),
      });
      reference;
      if (reference.length > 0) {
        res.status(500).send({
          error:
            "No se puede eliminar este documento, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await CandidateModel.findOneAndDelete({
          _id: new ObjectId(id),
        });

        res.status(200).send({ message: "Borrado con éxito", Result: result });
      }
    } catch (error) {
      "Error al eliminar el documento -> " + error.message;
      res.status(500).send({
        error: "error.",
      });
    }
  }
}
module.exports = { Candidate_Controllers };
