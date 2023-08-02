const { pruebaController } = require("../controllers/prueba.template.js");
const route = require("express").Router();
const Prueba = new pruebaController();

route.get("/", Prueba.getPrueba.bind());
route.get("/:id", Prueba.getIdPrueba.bind());
route.post("/", Prueba.postPrueba.bind());
route.put("/:id", Prueba.putPrueba.bind());
route.delete("/:id", Prueba.deletePrueba.bind());

// route.get("/", async (req, res, next) => {
//   const collection = "prueba";

//   try {
//     client = await DatabaseConnector(collection);
//     const result = await client.find({}).toArray();
//     res.status(200).send(result);
//   } finally {
//     client.close;
//   }
// });

// route.get("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   console.log(id + "<- id");
//   const collection = "prueba";
//   try {
//     client = await DatabaseConnector(collection);
//     const result = await client.find({ _id: new ObjectId(id) }).toArray();
//     res.send(result);
//   } finally {
//     client.close;
//   }
// });

// route.post("/", async (req, res, next) => {
//   const { name, lastname } = req.body;
//   const collection = "prueba";

//   try {
//     const client = await DatabaseConnector(collection);
//     const result = await client.insertOne({
//       name: name,
//       lastname: lastname,
//     });
//     if (result) {
//       res.status(200).send("Creado exitosamente...");
//     } else {
//       res.status(404).send("No se a creado...");
//     }
//   } catch (e) {
//     console.log(e);
//   } finally {
//     // client.close;
//   }
// });

// route.put("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   const { name, lastname } = req.body;
//   const collection = "prueba";
//   const upsert = { upsert: false };
//   try {
//     client = await DatabaseConnector(collection);
//     result = await client.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         $set: { name: name, lastname: lastname },
//       },
//       upsert
//     );
//     if (result) {
//       res.status(200).send("Actualizado con exito...");
//     } else {
//       res.status(404).send("No actualizado...");
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: `Error...${e}` });
//   } finally {
//     client.close;
//   }
// });

// route.delete("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   const collection = "prueba";
//   try {
//     const client = await DatabaseConnector(collection);
//     const result = await client.deleteOne({ _id: new ObjectId(id) });
//     if (result) {
//       res.status(200).send("eliminado correctamente");
//     }
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.close;
//   }
// });

module.exports = route;
