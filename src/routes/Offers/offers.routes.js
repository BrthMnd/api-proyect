const router = require("express").Router();
const {
  OffersControllers,
} = require("../../controllers/Offers/offers.controllers");
const offers = new OffersControllers();

router.get("/", offers.getStatus.bind());
router.get("/:id", offers.getIdStatus.bind());
router.post("/", offers.postStatus.bind());
router.put("/:id", offers.putStatus.bind());

router.delete("/:id", offers.deleteStatus.bind());

module.exports = router;
