const router = require("express").Router();

const Encargado = require("./encargado.routes");
const Propietario = require("./propietario.routes");
const Inmueble = require("./inmueble.routes");

router.use("/encargado", Encargado);
router.use("/propietario", Propietario);
router.use("/inmueble", Inmueble);

module.exports = router;
