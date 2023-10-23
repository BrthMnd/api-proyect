const router = require("express").Router();
const {
  OffersControllers,
} = require("../../controllers/Offers/offers.controller");
const offers = new OffersControllers();

router.get("/", offers.Get.bind());
router.get("/:id", offers.GetId.bind());
router.get("/candidato/:id", offers.GetId_CandidateForOffers.bind());
router.post("/", offers.Post.bind());
router.put("/:id", offers.Put.bind());
router.delete("/:id", offers.Delete_CandidateAndOffers.bind());

module.exports = router;
