const router = require("express").Router();
const {
  CandidateStatus_Controller,
} = require("../../controllers/Offers/candidateStatus.controller");
const CandidateStatus = new CandidateStatus_Controller();

router.get("/", CandidateStatus.getStatus.bind());
router.get("/:id", CandidateStatus.getIdStatus.bind());
router.post("/", CandidateStatus.postStatus.bind());
router.put("/:id", CandidateStatus.putStatus.bind());
router.delete("/:id", CandidateStatus.deleteStatus.bind());

module.exports = router;
