const router = require("express").Router();
const {
  StatusOffersControllers,
} = require("../../controllers/Offers/status_offers.controllers");
const Offers_Status = new StatusOffersControllers();

router.get("/", Offers_Status.getStatus.bind());
router.get("/:id", Offers_Status.getIdStatus.bind());
router.post("/", Offers_Status.postStatus.bind());
router.put("/:id", Offers_Status.putStatus.bind());

router.delete("/:id", Offers_Status.deleteStatus.bind());

module.exports = router;
