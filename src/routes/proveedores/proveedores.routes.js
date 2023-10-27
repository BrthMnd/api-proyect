const {
  ProveedoresController,
} = require("../../controllers/proveedores/proveedores.controllers");
const router = require("express").Router();
const Proveedores = new ProveedoresController();

router.get("/", Proveedores.getProveedores.bind());
router.get("/:id", Proveedores.getProveedorPorId.bind());
router.post("/", Proveedores.postProveedor.bind());
router.delete("/:id", Proveedores.deleteProveedor.bind());
router.put("/:id", Proveedores.putProveedor.bind());

//
router.put("/agregar/:id", Proveedores.AggregateNewCalificacion.bind());
router.put("/delete/:id", Proveedores.EliminateCalificacion.bind());

//
router.put("/agregar-categorias/:id", Proveedores.addCategoriasServicio.bind());
router.put(
  "/eliminar-categorias/:id",
  Proveedores.eliminateCategoriasServicio.bind()
);

// models -> controllers -> routes -> Final

module.exports = router;
