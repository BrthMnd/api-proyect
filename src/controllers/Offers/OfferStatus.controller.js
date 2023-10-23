const { ObjectId } = require("mongodb");
const { OffersStatus_Model } = require("../../models/Offers/OfferStatus");
const { ContractingModal } = require("../../models/Offers/contracting.model");

class OffersStatus_Controller {
  Get(req, res, next) {
    OffersStatus_Model.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          error: "Error al obtener estados de contrato",
          err: error.message,
        });
      })
      .finally(() => next());
  }

  Post(req, res, next) {
    const result = new OffersStatus_Model(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res
          .status(500)
          .json({ Error: "error-> estado de Contrato ***", err: error.message })
      )
      .finally(() => next());
  }
  async GetId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await OffersStatus_Model.find({
        _id: new ObjectId(id),
      });
      res.status(200).send(result);
    } catch (error) {
      console.log("*** El Error es: ***" + error.message);
    } finally {
      next();
    }
  }
  async Put(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await OffersStatus_Model.findOneAndUpdate(
        { _id: new ObjectId(id) },
        Update,
        { new: true } // Para obtener el documento actualizado en lugar del antiguo
      );

      if (result) {
        res
          .status(200)
          .json({ message: "Documento actualizado exitosamente", result });
      } else {
        res.status(500).json({ error: "Error al actualizar el documento" });
      }
    } catch (error) {
      console.log("Error -> " + error.message);
    } finally {
      next();
    }
  }
  async Delete(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await ContractingModal.find({
        id_contracting: new ObjectId(id),
      });
      console.log(reference);
      if (reference.length > 0) {
        res.status(500).send({
          error:
            "No se puede eliminar este documento, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await OffersStatus_Model.findOneAndDelete({
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
module.exports = { OffersStatus_Controller };
