const {ProveedorController} = require("../../controllers/proveedores/proveedor.controllers")
const router = require('express').Router()
const Proveedor = new ProveedorController()



router.get('/',Proveedor.getProveedor.bind())
router.get('/:id', Proveedor.getProveedorPorId.bind())
router.post('/', Proveedor.postProveedor.bind())
router.delete('/:id', Proveedor.deleteProveedor.bind())
router.put('/:id', Proveedor.putProveedor.bind())

// models -> controllers -> routes -> Final

module.exports  = router