const route = require("express").Router();

const EncargadoControllers = require("../../controllers/Inmuebles/encargado.controllers");

const Encargado = new EncargadoControllers();

route.get("/", Encargado.getEncargado.bind());
route.get("/:id", Encargado.getIdEncargado.bind());
route.post("/", Encargado.postEncargado.bind());
route.put("/:id", Encargado.putEncargado.bind());
route.delete("/:id", Encargado.deleteEncargado.bind());

module.exports = route;
