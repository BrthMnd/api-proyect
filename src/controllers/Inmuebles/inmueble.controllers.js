const { ObjectId } = require("mongodb");
const { InmuebleModels } = require("../../models/Inmueble/inmueble.models");

class InmuebleControllers {
  
  getInmueble(req, res, next) {
    InmuebleModels.find({})
      .populate("id_propietario")
      .populate("id_encargado")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Estados" });
      })
      .finally(() => next());
  }

  postInmueble(req, res, next) {
    const result = new InmuebleModels(req.body);
    result
      .save()
      .then((data) =>
        res.status(201).json({ result: data, message: "Created" })
      )
      .catch((error) => res.status(500).json({ Error: "ERROR CON ESTADO ***" }))
      .finally(() => next());
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
      console.log("error" + error);
    } finally {
      next();
    }
  }
  async putInmueble(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await InmuebleModels.findOneAndUpdate(
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
      console.log(error);
    } finally {
      next();
    }
  }
  async deleteInmueble(req, res, next) {
    const id = req.params.id;
    try {
      const result = await InmuebleModels.findOneAndDelete({
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
module.exports = { InmuebleControllers };
