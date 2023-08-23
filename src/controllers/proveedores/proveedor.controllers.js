const { ObjectId } = require("mongodb");
const { ProveedorModel } = require("../../models/Proveedores/proveedor.models");

class ProveedorController {
  async getProveedor(req, res) {
    // const db = new DatabaseConnector();
    try {
      await db.connect();
      const result = await ProveedorModel.find({}).exec();

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los proveedores" });
    } finally {
    }
  }

//__________________________________________________________________________________________


  async getProveedorPorId(req, res, next) {
    const id = req.params.id;

    try {
      await db.connect();
      const result = await ProveedorModel.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener el proveedor" });
    } finally {
    }
  }

//__________________________________________________________________________________________

  async postProveedor(req, res) {
    const { ID_Proveedor, ID_Servicio } = req.body;
    const collection = "proveedor";
    try {
      await db.connect();
      const client = await db.getCollection(collection);
      const result = await ProveedorModel.insertOne({
        ID_Proveedor: ID_Proveedor,
        ID_Servicio: ID_Servicio,
      });

      if (result) {
        res.status(200).json({ message: "Proveedor creado exitosamente" });
      } else {
        res.status(500).json({ error: "Error al crear el proveedor" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear el proveedor" });
    } finally {
      db.close();
    }
  }

//__________________________________________________________________________________________

  async putProveedor(req, res, next) {
    const { ID_Proveedor, ID_Servicio } = req.body;
    const id = req.params.id;
    const collection = "proveedor";
    try {
      await db.connect();
      const result = await ProveedorModel.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ID_Proveedor: ID_Proveedor,
            ID_Servicio: ID_Servicio,
          }
        }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Proveedor actualizado exitosamente" });
      } else {
        res.status(500).json({ error: "Error al actualizar el proveedor" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar el proveedor" });
    } finally {
      db.close();
    }
  }


//__________________________________________________________________________________________

  async deleteProveedor(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ProveedorModel.deleteOne({ _id: new ObjectId(id) });

      if (result) {
        res.status(200).send({ message: "Proveedor borrado con éxito" });
      } else {
        res.status(500).send({ error: "Error al eliminar el proveedor" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error al eliminar el proveedor" });
    } finally {
      db.close();
    }
  }
}

module.exports = {ProveedorController};
