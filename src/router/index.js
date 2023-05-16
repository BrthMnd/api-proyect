const express = require('express');
const router = express.Router();

const Propietario = require("./Propietarios");
const Oferta = require("./Ofertas");
const Usuario = require("./Usuarios");
const Inmueble = require("./inmuebles");

router.use("/propietario", Propietario);
router.use("/oferta", Oferta);
router.use("/usuario", Usuario);
router.use("/inmueble", Inmueble);



module.exports = router;