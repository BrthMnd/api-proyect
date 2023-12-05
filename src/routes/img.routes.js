const router = require("express").Router();
const {
  Images_controllers,
} = require("../../src/controllers/Images.controller");
const Images = new Images_controllers();

router.get("/:image", Images.Get.bind());

module.exports = router;
