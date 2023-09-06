const route = require("express").Router();
const {
  propietarioController,
} = require("../../controllers/Inmuebles/propietario.controller");

const Propietario = new propietarioController();

route.get("/", Propietario.getPropietario.bind());
route.get("/:id", Propietario.getIdPropietario.bind());
route.post("/", Propietario.postPropietario.bind());
route.put("/:id", Propietario.putPropietario.bind());
route.delete("/:id", Propietario.deletePropietario.bind());


module.exports = route;
