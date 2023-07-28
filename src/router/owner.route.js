const express = require('express');
const { crateOwner } = require('../controllers/onwer.controller');
const routeOwner = express.Router()
const pruebaController = require('../controllers/Prueba')

let prueba = new pruebaController()
routeOwner.post('/propietario', prueba.createPruea )


module.exports = routeOwner

