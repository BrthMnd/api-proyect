const router = require("express").Router();
const {
  OffersControllers,
} = require("../../controllers/Offers/offers.controller");
const offers = new OffersControllers();

router.get("/", offers.getStatus.bind());
router.get("/:id", offers.getIdStatus.bind());
router.get("/candidato/:id", offers.getIdCandidateForOffers.bind());
router.post("/", offers.postStatus.bind());
router.put("/:id", offers.putStatus.bind());
router.delete("/:id", offers.deleteCandidateAndOffers.bind());

module.exports = router;
