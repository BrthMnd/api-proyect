const router = require("express").Router();
const {
  Contracting_Controller,
} = require("../../controllers/Offers/contracting.controller");
const Contracting = new Contracting_Controller();

router.get("/", Contracting.Get.bind());
router.get("/:id", Contracting.GetId.bind());
router.post("/", Contracting.Post.bind());
router.put("/:id", Contracting.Put.bind());
router.delete("/:id", Contracting.Delete.bind());

module.exports = router;
