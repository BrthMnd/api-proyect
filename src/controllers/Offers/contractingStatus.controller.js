const { ObjectId } = require("mongodb");
const {
  ContractingStatusModel,
} = require("../../models/Offers/contractingStatus.modal");

class ContractingStatus_Controller {
  getStatus(req, res, next) {
    ContractingStatusModel.find()
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

  postStatus(req, res, next) {
    const { name, description } = req.body;

    const result = new ContractingStatusModel({
      name,
      description,
    });
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
  async getIdStatus(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ContractingStatusModel.find({
        _id: new ObjectId(id),
      });
      res.status(200).send(result);
    } catch (error) {
      console.log("*** El Error es: ***" + error.message);
    } finally {
      next();
    }
  }
  async putStatus(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await ContractingStatusModel.findOneAndUpdate(
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
      console.log("Error -> " + error.message);
    } finally {
      next();
    }
  }
  async deleteStatus(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ContractingStatusModel.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Borrado con éxito", result });
      } else {
        res.status(500).send({ error: "Error al eliminar el documento" });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      next();
    }
  }
}
module.exports = { ContractingStatus_Controller };
