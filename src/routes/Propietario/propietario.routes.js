const route = require("express").Router();
const {
  propietarioController,
} = require("../../controllers/Propietarios/propietario.controller");

const Propietario = new propietarioController();

route.get("/", Propietario.getPropietario.bind());
route.post("/", Propietario.postPropietario.bind());
route.put("/:id", Propietario.putPropietario.bind());
route.delete("/:id", Propietario.deletePropietario.bind());


module.exports = route;
