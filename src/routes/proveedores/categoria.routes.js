const {CategoriasController} = require("../../controllers/proveedores/categoria.cotrollers")
const router = require('express').Router()
const Categorias = new CategoriasController()


router.get('/',Categorias.getCategorias.bind())
router.get('/:id',Categorias.getCategoriaPorId.bind())
router.post('/',Categorias.postCategoria.bind())
router.delete('/:id',Categorias.deleteCategoria.bind())
router.put('/:id',Categorias.putCategoria.bind())


module.exports = router