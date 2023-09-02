const router = require("express").Router();

const Calificacion = require("./calificacion.routes");
const Categoria = require("./categoria.routes");
const Proveedores = require("./proveedores.routes");
const Servicios = require("./servicios.routes");

router.use("/calificacion", Calificacion);
router.use("/categoria", Categoria);
router.use("/proveedor", Proveedores);
router.use("/servicios", Servicios);

module.exports = router;
