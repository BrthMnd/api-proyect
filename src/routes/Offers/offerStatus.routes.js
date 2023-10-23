const router = require("express").Router();
const {
  OffersStatus_Controller,
} = require("../../controllers/Offers/OfferStatus.controller");
const OffersStatus = new OffersStatus_Controller();

router.get("/", OffersStatus.Get.bind());
router.get("/:id", OffersStatus.GetId.bind());
router.post("/", OffersStatus.Post.bind());
router.put("/:id", OffersStatus.Put.bind());
router.delete("/:id", OffersStatus.Delete.bind());

module.exports = router;
