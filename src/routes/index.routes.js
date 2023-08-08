const router = require("express").Router();

const Prueba = require("./prueba.routes");

router.use("/prueba", Prueba);

module.exports = router;
