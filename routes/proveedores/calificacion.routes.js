const router = require("express").Router();
const CalificacionesController = require("../../controllers/proveedores/calificacion.controllers");
const Calificacion = new CalificacionesController();

router.get("/", Calificacion.getCalificaciones.bind());
router.get("/:id", Calificacion.getCalificacionPorId.bind());
router.post("/", Calificacion.postCalificacion.bind());
router.delete("/:id", Calificacion.deleteCalificacion.bind());
router.put("/:id", Calificacion.putCalificacion.bind());

module.exports = router;
