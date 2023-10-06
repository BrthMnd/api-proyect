/** @format */

const express = require("express");
const countriesController = require("../../controllers/coutriesController");
const router = express.Router();

const Controller = new countriesController();

router.get("/country-names-codes", Controller.getCountriesAndCodes.bind());
router.get("/", Controller.getCountries.bind());
router.get("/:alpha3Code", Controller.getCountrieByAlp3code.bind());
router.get("/search/:searchTerm", Controller.getCountrieByName.bind());
router.get("/region/:regionName", Controller.getCountriesByRegion.bind());
router.get("/:alpha3Code/summary", Controller.getSumaryByAlp3code.bind());

module.exports = router;
