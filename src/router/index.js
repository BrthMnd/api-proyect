const express = require("express");
const router = express.Router();

const Prueba = require("./prueba.js");

router.use("/prueba", Prueba);

module.exports = router;
