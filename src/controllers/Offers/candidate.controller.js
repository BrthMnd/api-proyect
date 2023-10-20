const { ObjectId } = require("mongodb");
const { CandidateModel } = require("../../models/Offers/candidate.model");
const { ContractingModal } = require("../../models/Offers/contracting.model");

class Candidate_Controllers {
  getStatus(req, res, next) {
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
      })
      .finally(() => {
        next();
      });
  }
  postStatus(req, res, next) {
    const result = new CandidateModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res
          .status(500)
          .json({ Error: "ERROR CON ESTADO ***", err: error.message })
      )
      .finally(() => next());
  }
  async getIdStatus(req, res, next) {
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
      console.log("error" + error);
    } finally {
      next();
    }
  }

  async putStatus(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await CandidateModel.findOneAndUpdate(
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
      console.log(error.message);
    } finally {
      next();
    }
  }
  async AggregateNewCandidate(req, res, next) {
    const { id_ServiceProvider } = req.body;
    const candidateId = req.params.id;
    try {
      const result = await CandidateModel.findByIdAndUpdate(
        candidateId,
        { $addToSet: { id_ServiceProvider: id_ServiceProvider } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Candidato no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Candidato no encontrado.", err: error.message });
    } finally {
      next();
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
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Candidato no seleccionado.", err: error.message });
    } finally {
      next();
    }
  }
  async EliminateCandidate(req, res, next) {
    const serviceProviderIdToDelete = req.body.id_ServiceProvider;
    const candidateId = req.params.id;
    try {
      const result = await CandidateModel.findByIdAndUpdate(
        candidateId,
        { $pull: { id_ServiceProvider: serviceProviderIdToDelete } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "Candidato no encontrado." });
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      next();
    }
  }
  async deleteStatus(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await ContractingModal.find({
        id_CandidateStatus: new ObjectId(id),
      });
      console.log(reference);
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
      console.log("Error al eliminar el documento -> " + error.message);
      res.status(500).send({
        error: "error.",
      });
    } finally {
      next();
    }
  }
}
module.exports = { Candidate_Controllers };
