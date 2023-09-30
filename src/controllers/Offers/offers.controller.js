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
        res.status(500).json({ error: "Error al obtener Ofertas" });
      })
      .finally(() => next());
  }

  postStatus(req, res, next) {
    const result = new OffersModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res
          .status(500)
          .json({ Error: "*** Error al Ingresar datos *** >>>", err: error })
      )
      .finally(() => next());
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
      console.log(error.message);
    } finally {
      next();
    }
  }
  async deleteStatus(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await CandidateModel.find({
        id_offers: new ObjectId(id),
      });
      console.log(reference);
      if (reference.length > 0) {
        res.status(500).send({
          error:
            "No se puede eliminar este documento, ya que se utiliza en otra parte. ",
        });
        throw new Error(
          "No se puede eliminar este documento, ya que se utiliza en otra parte."
        );
      } else {
        const result = await OffersModel.findOneAndDelete({
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
module.exports = { OffersControllers };
