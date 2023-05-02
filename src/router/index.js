const express = require('express');
const router = express.Router();

const Propietario = require("./Propietarios");
const Oferta = require("./Ofertas");
const Usuario = require("./Usuarios");

router.use("/propietario", Propietario);
router.use("/oferta", Oferta);
router.use("/usuario", Usuario);



module.exports = router;