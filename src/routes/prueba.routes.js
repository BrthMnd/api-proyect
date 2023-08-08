const { pruebaController } = require("../controllers/prueba.template.js");
const route = require("express").Router();
const Prueba = new pruebaController();

route.get("/", Prueba.getPrueba.bind());
route.get("/:id", Prueba.getIdPrueba.bind());
// route.post("/", Prueba.postPrueba.bind());
// route.put("/:id", Prueba.putPrueba.bind());
// route.delete("/:id", Prueba.deletePrueba.bind());

module.exports = route;
