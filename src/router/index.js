const express = require("express");
const router = express.Router();

const Prueba = require("./prueba.js");

router.use("/prueba", Prueba);
router.use(require('./owner.route.js'));

module.exports = router;
