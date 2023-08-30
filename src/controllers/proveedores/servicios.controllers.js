const { ObjectId } = require("mongodb");
const { ServicioModels } = require("../../models/Proveedores/servicios.models");

// ______________________________________________________________________________________

class ServiciosController {
  async getServicios(req, res, next) {
    try {
      const result = await ServicioModels.find({});

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }

  //______________________________________________________________________________________

  async getServicioPorId(req, res, next) {
    const id = req.params.id;

    try {
      const result = await ServicioModels.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      next();
    }
  }

  //   ______________________________________________________________________________________

  async postServicio(req, res, next) {
    try {
      const result = new ServicioModels(req.body);
      const data = await result.save();
      res.status(201).send({ create: data, message: "Servicio Creado" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: " Error al crear ", err: error });
    } finally {
      next();
    }
  }

  //______________________________________________________________________________________

  async putServicio(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await ServicioModels.findOneAndUpdate(
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

  //______________________________________________________________________________________

  async deleteServicio(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ServicioModels.deleteOne({ _id: new ObjectId(id) });

      if (result) {
        res.status(200).send({ message: "Borrado con éxito" });
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

module.exports = { ServiciosController };
