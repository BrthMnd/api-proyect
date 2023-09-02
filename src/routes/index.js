const router = require("express").Router();

const Inmuebles = require("./Inmueble");
const Ofertas = require("./Offers");

router.use("/ofertas", Ofertas);
router.use("/inmuebles", Inmuebles);
// router.use("/pruebas", Prueba); // <-

module.exports = router;
