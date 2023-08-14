const { ObjectId } = require("mongodb");
const { PruebaModels } = require("../models/prueba.models");

class pruebaController {
  getPrueba(req, res) {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener usuarios" });
      })
      .finally();
  }

  async getIdPrueba(req, res, next) {
    const id = req.params.id;

    try {
      await db.connect();
      const result = await PruebaModels.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("eeeror" + error);
    } finally {
    }
  }
  async postPrueba(req, res) {
    const { name, lastname } = req.body;

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
