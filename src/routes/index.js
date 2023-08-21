const router = require("express").Router();

const Prueba = require("./prueba.routes");
const Propietarios = require('./Propietario/propietario.routes');
const Encargados = require('./Encargado/encargado.routes');

const Inmuebles = require('./Inmueble/inmueble.route');
const Ofertas = require("./Offers");

router.use("/ofertas", Ofertas);
router.use('/propietario', Propietarios)
router.use('/encargado', Encargados);
router.use('/inmueble', Inmuebles);
// router.use("/pruebas", Prueba); // <-

module.exports = router;
