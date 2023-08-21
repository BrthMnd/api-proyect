const route = require('express').Router();

const {InmuebleControllers} = require('../../controllers/Inmuebles/inmueble.controllers')

const Inmueble = new InmuebleControllers();

route.get('/', Inmueble.getInmueble.bind());
route.get('/:id', Inmueble.getIdInmueble.bind());
route.post('/', Inmueble.postInmueble.bind());
route.put('/:id', Inmueble.putInmueble.bind());
route.delete('/:id', Inmueble.deleteInmueble.bind());

module.exports = route;