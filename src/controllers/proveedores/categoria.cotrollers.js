const { ObjectId } = require("mongodb");
const { CategoriaServicio } = require("../../models/Proveedores/categoria.models");

class CategoriasController {
  getCategorias(req, res, next) {
    CategoriaServicio.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener Cartergorias" });
    })
    .finally(() => next());
  } 


//__________________________________________________________________________________________ 

  async getCategoriaPorId(req, res, next) {
    const id = req.params.id;

    try {
      await db.connect();
      const result = await CategoriaServicio.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener la categoría" });
    } finally {
    }
  }

//__________________________________________________________________________________________

  async postCategoria(req, res) {
    const { Nombre_Categoria, Descripcion, Estado } = req.body;
    const collection = "categoria";
    try {
      
      const result = await CategoriaServicio.insertOne({
        Nombre_Categoria: Nombre_Categoria,
        Descripcion: Descripcion,
        Estado: Estado,
      });

      if (result) {
        res.status(200).json({ message: "Categoría creada exitosamente" });
      } else {
        res.status(500).json({ error: "Error al crear la categoría" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear la categoría" });
    } finally {
      db.close();
    }
  }

//__________________________________________________________________________________________

  async putCategoria(req, res, next) {
    const { Nombre_Categoria, Descripcion, Estado } = req.body;
    const id = req.params.id;
    const collection = "categoria";
    try {
      const result = await CategoriaServicio.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            Nombre_Categoria: Nombre_Categoria,
            Descripcion: Descripcion,
            Estado: Estado,
          }
        }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Categoría actualizada exitosamente" });
      } else {
        res.status(500).json({ error: "Error al actualizar la categoría" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar la categoría" });
    } finally {
      db.close();
    }
  }

//__________________________________________________________________________________________

  async deleteCategoria(req, res, next) {
    const id = req.params.id;
    const collection = "categoria";
    try {
      const result = await CategoriaServicio.deleteOne({ _id: new ObjectId(id) });

      if (result) {
        res.status(200).send({ message: "Categoría borrada con éxito" });
      } else {
        res.status(500).send({ error: "Error al eliminar la categoría" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error al eliminar la categoría" });
    } finally {
      db.close();
    }
  }
}

module.exports = {CategoriasController};
