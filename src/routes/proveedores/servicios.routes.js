const {ServiciosController} = require("../../controllers/proveedores/servicios.controllers")
const router = require('express').Router()
const Servicios = new ServiciosController()


router.get('/', Servicios.getServicios.bind())
router.get('/:id', Servicios.getServicioPorId.bind())
router.post('/',Servicios.postServicio.bind())
router.put('/:id',Servicios.putServicio.bind())
router.delete('/:id',Servicios.deleteServicio.bind())

module.exports = router