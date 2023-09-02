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
      await result.save();

      res.status(200).json({ message: "Documento creado exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear el documento" });
    } finally {
      next();
    }
  }

  //______________________________________________________________________________________

  async putServicio(req, res, next) {
    const { Nombre_Servicio, Descripcion, estado, Categoria_Servicios } =
      req.body;
    const id = req.params.id;
    try {
      const result = await ServicioModels.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            Nombre_Servicio: Nombre_Servicio,
            Descripcion: Descripcion,
            estado: estado,
            Categoria_Servicios: Categoria_Servicios,
          },
        }
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
