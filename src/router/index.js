const express = require("express");
const router = express.Router();

const Prueba = require("./prueba.js");

router.use("/prueba", Prueba);
// router.use("/oferta", Oferta);
// router.use("/usuario", Usuario);
// router.use("/inmueble", Inmueble);

module.exports = router;
