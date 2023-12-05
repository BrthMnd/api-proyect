const { ObjectId } = require("mongodb");
const { EncargadoModels } = require("../../models/Inmueble/encargado.models");
const { InmuebleModels } = require("../../models/Inmueble/inmueble.models");

class EncargadoControllers {
  getEncargado(req, res, next) {
    EncargadoModels.find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Erro al obtener datos", err: error.message });
      });
  }

  postEncargado(req, res, next) {
    const result = new EncargadoModels(req.body);
    result
      .save()
      .then((result) => res.status(200).json(result))
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
            .json({ error: "Error al insertar Encargado ", err: error });
        }
      });
  }

  async getIdEncargado(req, res, next) {
    const id = req.params.id;
    try {
      const result = await EncargadoModels.findOne({
        _id: new ObjectId(id),
      });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("No se encontro nada en el ID ingresado");
      }
    } catch (error) {
      "error" + error;
    }
  }

  async putEncargado(req, res, next) {
    const update = req.body;
    const id = req.params.id;

    try {
      const existingUpdate = await EncargadoModels.findOne({
        documento: update.documento,
      });
      if (existingUpdate && existingUpdate._id !== id) {
        return res.status(409).json({
          error: "Este documento ya se encuentra registrado",
        });
      }
      const result = await EncargadoModels.findOneAndUpdate(
        { _id: new ObjectId(id) },
        req.body,
        { new: true }
      );
      if (result) {
        res
          .status(200)
          .json({ message: "Documento actualizado con exito", result });
      } else {
        res.status(500).json({ error: "Error al actualizar documento" });
      }
    } catch (error) {
      error;
    }
  }

  async deleteEncargado(req, res, next) {
    const id = req.params.id;

    try {
      const reference = await InmuebleModels.find({
        id_encargado: new ObjectId(id),
      });
      reference;
      if (reference.length > 0) {
        res.status(409).send({
          error:
            "No se puede eliminar este Propietario, ya que se utiliza en otra parte.",
        });
      } else {
        const result = await EncargadoModels.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (result) {
          res.status(200).send({ message: "Encargado borrada con éxito" });
        } else {
          res.status(404).send({ error: "Encargado no encontrada" });
        }
      }
    } catch (error) {
      console.error("Error al eliminar la encargado -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    }
  }
}

module.exports = {
  EncargadoControllers,
};
