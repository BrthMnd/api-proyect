const router = require("express").Router();


const Calificacion = require("./calificacion.routes");
const Categoria = require("./categoria.routes");
const Proveedor = require("./proveedor.routes");
const Proveedores = require("./proveedores.routes"); // nombre(!)
const Servicios = require("./servicios.routes");

router.use("/calificacion", Calificacion);

router.use("/categoria", Categoria);

router.use("/proveedor", Proveedor);

router.use("/proveedores", Proveedores);

router.use("/servicios", Servicios);



module.exports = router;