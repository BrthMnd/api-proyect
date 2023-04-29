const express = require('express');
const router = express.Router();

const router_dePrueba = require("./tabla_prueba");

router.use("/rutaPrueba", router_dePrueba);

router.use("/", (req, res) => {
    res.send("Raiz")
});
router.use((req, res, next) => {
    res.status(404).send('Lo siento, no se encontró la página solicitada');
});



module.exports = router;