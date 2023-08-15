const router = require("express").Router();
const {
  CandidateControllers,
} = require("../../controllers/Offers/candidate.controllers");
const candidate = new CandidateControllers();

router.get("/", candidate.getStatus.bind());
router.get("/:id", candidate.getIdStatus.bind());
router.post("/", candidate.postStatus.bind());
router.put("/:id", candidate.putStatus.bind());

router.delete("/:id", candidate.deleteStatus.bind());

module.exports = router;
