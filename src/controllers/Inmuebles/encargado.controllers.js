const { ObjectId } = require("mongodb");
const { EncargadoModels } = require("../../models/Inmueble/encargado.models");

class EncargadoControllers {
  getEncargado(req, res, next) {
    EncargadoModels.find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Erro al obtener datos" });
      })
      .finally(() => next());
  }

  postEncargado(req, res, next) {
    const result = new EncargadoModels(req.body);
    result
      .save()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ error: "Error al insertar" }))
      .finally(() => next());
  }

  async getIdEncargado(req, res, next) {
    const id = req.params.id;
    try {
      const result = await EncargadoModels({
        _id: new ObjectId(id),
      });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("No se encontro nada en el ID ingresado");
      }
    } catch (error) {
      console.log("error" + error);
    } finally {
      next();
    }
  }

  async putEncargado(req, res, next) {
    const update = require.body;
    const id = req.params.id;

    try {
      const result = await EncargadoModels.findOneAndUpdate(
        { _id: new ObjectId(id) },
        update,
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
      console.log(error);
    } finally {
      next();
    }
  }

  async deleteEncargado(req, res, next) {
    const id = req.params.id;
    try {
      const result = await EncargadoModels.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Borrado con exito", result });
      } else {
        res.status(500).send({ error: "Error al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
}

module.exports = {
  EncargadoControllers,
};
