const router = require("express").Router();

const Prueba = require("./prueba.routes.js");

router.use("/prueba", Prueba);

module.exports = router;
