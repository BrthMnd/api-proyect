const router = require("express").Router();
const {Dashboard} = require("../../src/controllers/Dashboard.controller");
const DashboardController = new Dashboard();

router.get("/" , DashboardController.Grafics_Get.bind())

module.exports = router;
