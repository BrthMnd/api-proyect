const { ObjectId } = require("mongodb");
const { ContractingModal } = require("../../models/Offers/contracting.model");
const { CandidateModel } = require("../../models/Offers/candidate.model");
const { OffersModel } = require("../../models/Offers/offers.model");

class Contracting_Controller {
  Get(req, res, next) {
    ContractingModal.find()

      .populate({
        path: "id_candidates",
        populate: { path: "selectedCandidate" },
      })
      .populate("id_provider")
      .populate("id_offers")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Contrato", error });
      });
  }
  // estado: { type: Boolean, default: true },
  // id_candidates: { type: Schema.Types.ObjectId, ref: CandidateModel.modelName },
  // id_provider: {
  //   type: Schema.Types.ObjectId,
  //   ref: ProveedoresModels.modelName,
  // },
  // id_offers: { type: Schema.Types.ObjectId, ref: OffersModel.modelName },
  // DateApplied: { type: String, default: FechaActual },

  async Post(req, res, next) {
    const { id_candidates, id_provider, id_offers } = req.body;
    try {
      const response_offer = await OffersModel.findOneAndUpdate(
        { _id: new ObjectId(id_offers) },
        {},
        { new: true }
      );
      const result = new ContractingModal({
        id_candidates,
        id_provider,
        id_offers,
      });
      const response = await result.save();
      if (!response) {
        return res
          .status(400)
          .json({ message: "A ocurrido un error 1", response });
      }
      const update_candidate = await CandidateModel.findByIdAndUpdate(
        { _id: new ObjectId(id_candidates) },
        {
          selectedCandidate: id_provider,
        },
        { new: true }
      );

      if (!update_candidate) {
        return res
          .status(400)
          .json({ message: "A ocurrido un error 2", update_candidate });
      }

      res.status(201).json({ message: "Success", response: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el documento", error });
    } finally {
      next();
    }
  }
  async GetId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ContractingModal.find({
        _id: new ObjectId(id),
      })
        .populate("id_candidates")
        .populate("id_proveedor")
        .populate("id_offers");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      console.log("error" + error);
    }
  }
  async Put(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await ContractingModal.findOneAndUpdate(
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
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
  async Delete(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ContractingModal.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Borrado con éxito", result });
      } else {
        res.status(500).send({ error: "Error al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = { Contracting_Controller };
