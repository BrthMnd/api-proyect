const {ServiciosController} = require("../../controllers/proveedores/servicios.controllers")
const router = require('express').Router()
const Servicios = new ServiciosController()


router.get('/', Servicios.getServicios.bind())
router.get('/:id', Servicios.getServicioPorId.bind())
router.post('/',Servicios.postServicio.bind())
router.delete('/:id',Servicios.putServicio.bind())
router.put('/:id',Servicios.deleteServicio.bind())

module.exports = router