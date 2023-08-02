const express = require("express");
const { createOwner } = require("../controllers/onwer.controller");
const routeOwner = express.Router();
const pruebaController = require("../controllers/prueba.template");

let prueba = new pruebaController();
routeOwner.post("/propietario", prueba.createPruea);

module.exports = routeOwner;
