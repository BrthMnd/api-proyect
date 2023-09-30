const router = require("express").Router();

const OfferRoute = require("./offers.routes");
const CandidateStatusRoute = require("./candidateStatus.routes");
const ContractingStatusRoute = require("./contractingStatus.routes");
const CandidateRoute = require("./candidate.routes");
const ContractingRoute = require("./contracting.routes");

router.use("/oferta", OfferRoute);
router.use("/estado_candidato", CandidateStatusRoute);
router.use("/estado_contrato", ContractingStatusRoute);
router.use("/candidato", CandidateRoute);
router.use("/contrato", ContractingRoute);

module.exports = router;
