const router = require("express").Router();

const Inmuebles = require("./Inmueble");
const Ofertas = require("./Offers");
const Proveedores = require("./proveedores");
const Usuario = require("./users");

router.use("/ofertas", Ofertas);
router.use("/inmuebles", Inmuebles);
router.use("/proveedores", Proveedores);
router.use("/usuarios", Usuario);

module.exports = router;
