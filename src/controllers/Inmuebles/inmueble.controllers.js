const { ObjectId } = require("mongodb");
const { InmuebleModels } = require("../../models/Inmueble/inmueble.models");
const { OffersModel } = require("../../models/Offers/offers.model");

class InmuebleControllers {
  getInmueble(req, res, next) {
    InmuebleModels.find({})
      .populate("id_propietario")
      .populate("id_encargado")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Error al obtener Estados", err: error.message });
      });
  }

  postInmueble(req, res, next) {
    const result = new InmuebleModels(req.body);
    result
      .save()
      .then((data) =>
        res.status(201).json({ result: data, message: "Created" })
      )
      .catch((error) => {
        error;

        if (error.code === 11000) {
          if (error.keyPattern.documento) {
            res.status(409).json({
              error: "Este documento ya se encuentra registrado",
              err: error,
            });
          } else {
            res
              .status(500)
              .json({ error: "Algo esta mal con el campo único", err: error });
          }
        } else {
          res
            .status(500)
            .json({ error: "Error al insertar Inmueble", err: error.message });
        }
      });
  }
  async getIdInmueble(req, res, next) {
    const id = req.params.id;
    try {
      const result = await InmuebleModels.find({
        _id: new ObjectId(id),
      })
        .populate("id_propietario")
        .populate("id_encargado");
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
  async putInmueble(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const existingUpdate = await InmuebleModels.findOne({
        documento: Update.documento,
      });
      if (existingUpdate && existingUpdate._id !== id) {
        return res.status(409).json({
          error: "Este documento ya se encuentra registrado",
        });
      }
      const result = await InmuebleModels.findOneAndUpdate(
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
      error;
    }
  }
  async deleteInmueble(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await OffersModel.find({
        id_property: new ObjectId(id),
      });
      reference;
      if (reference.length > 0) {
        res.status(409).send({
          error:
            "No se puede eliminar este Inmueble, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await InmuebleModels.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Inmueble borrada con éxito" });
        } else {
          res.status(404).send({ error: "Inmueble no encontrada" });
        }
      }
    } catch (error) {
      console.error("Error al eliminar el inmueble -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    }
  }
}
module.exports = { InmuebleControllers };
