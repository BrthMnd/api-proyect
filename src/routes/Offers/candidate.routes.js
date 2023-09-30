const router = require("express").Router();
const {
  Candidate_Controllers,
} = require("../../controllers/Offers/candidate.controller");
const Candidate = new Candidate_Controllers();

router.get("/", Candidate.getStatus.bind());
router.get("/:id", Candidate.getIdStatus.bind());
router.post("/", Candidate.postStatus.bind());
router.put("/:id", Candidate.putStatus.bind());
router.put("/add/:id", Candidate.AggregateNewCandidate.bind());
router.put("/delete/:id", Candidate.EliminateCandidate.bind());
router.delete("/:id", Candidate.deleteStatus.bind());

module.exports = router;
