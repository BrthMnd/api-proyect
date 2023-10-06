const router = require("express").Router();

const Inmuebles = require("./Inmueble");
const Ofertas = require("./Offers");
const Proveedores = require("./proveedores");

router.use("/ofertas", Ofertas);
router.use("/inmuebles", Inmuebles);
router.use("/proveedores", Proveedores);

module.exports = router;
