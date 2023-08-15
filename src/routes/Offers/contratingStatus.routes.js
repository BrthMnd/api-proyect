const router = require("express").Router();
const {
  ContractingStatusController,
} = require("../../controllers/Offers/contratingStatus.controllers");
const contratingStatus = new ContractingStatusController();

router.get("/", contratingStatus.getStatus.bind());
router.get("/:id", contratingStatus.getIdStatus.bind());
router.post("/", contratingStatus.postStatus.bind());
router.put("/:id", contratingStatus.putStatus.bind());

router.delete("/:id", contratingStatus.deleteStatus.bind());

module.exports = router;
