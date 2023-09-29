const router = require("express").Router();
const {
  ContractingStatus_Controller,
} = require("../../controllers/Offers/contractingStatus.controller");
const ContractingStatus = new ContractingStatus_Controller();

router.get("/", ContractingStatus.getStatus.bind());
router.get("/:id", ContractingStatus.getIdStatus.bind());
router.post("/", ContractingStatus.postStatus.bind());
router.put("/:id", ContractingStatus.putStatus.bind());
router.delete("/:id", ContractingStatus.deleteStatus.bind());

module.exports = router;
