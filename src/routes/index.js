const router = require("express").Router();

const Prueba = require("./prueba.routes");
const Ofertas = require("./Offers");
router.use("/ofertas", Ofertas);
router.use("/pruebas", Prueba);

module.exports = router;
