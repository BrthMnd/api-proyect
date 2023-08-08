const { ObjectId } = require("mongodb");
const { DatabaseConnector } = require("../config/db");
const { PruebaModels } = require("../models/prueba.models");
const db = new DatabaseConnector();
class pruebaController {
  async getPrueba(req, res) {
    try {
      await db.connect();
      const result = await PruebaModels.find({}).exec();
      console.log(result);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
    } finally {
      await db.close();
    }
  }

  async getIdPrueba(req, res, next) {
    const id = req.params.id;
    const db = new DatabaseConnector();
    const collection = "prueba";
    try {
      await db.connect();
      const client = await db.getCollection(collection);
      const result = await client.find({ _id: new ObjectId(id) }).toArray();

      res.send(result);
    } catch (error) {
      console.log(error);
    } finally {
      db.close();
    }
  }
  async postPrueba(req, res) {
    const { name, lastname } = req.body;
    const db = new DatabaseConnector();
    const collection = "prueba";
    try {
      await db.connect();
      const client = await db.getCollection(collection);
      const result = await client.insertOne({
        name: name,
        lastname: lastname,
      });

      if (result) {
        res.status(200).json({ message: "Documento creado exitosamente" });
      } else {
        res.status(500).json({ error: "Error al creado el documento" });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    } finally {
      db.close();
    }
  }
  async putPrueba(req, res, next) {
    const { name, lastname } = req.body;
    const id = req.params.id;
    const db = new DatabaseConnector();
    const collection = "prueba";
    try {
      await db.connect();
      const client = await db.getCollection(collection);
      const result = await client.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { name: name, lastname: lastname },
        }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Documento actualizado exitosamente" });
      } else {
        res.status(500).json({ error: "Error al actualizar el documento" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      db.close();
    }
  }
  async deletePrueba(req, res, next) {
    const id = req.params.id;
    const db = new DatabaseConnector();
    const collection = "prueba";
    try {
      await db.connect();
      const client = await db.getCollection(collection);
      const result = await client.deleteOne({ _id: new ObjectId(id) });

      if (result) {
        res.status(200).send({ message: "Borrado con exito" });
      } else {
        res.status(500).send({ error: "Error al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      db.close();
    }
  }
}
module.exports = { pruebaController };
