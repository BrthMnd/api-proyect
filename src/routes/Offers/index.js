const router = require("express").Router();

const OfferRoute = require("./offers.routes");
const OfferStatus = require("./offerStatus.routes");
const CandidateRoute = require("./candidate.routes");
const ContractingRoute = require("./contracting.routes");

router.use("/oferta", OfferRoute);
router.use("/estado_oferta", OfferStatus);
router.use("/candidato", CandidateRoute);
router.use("/contrato", ContractingRoute);

module.exports = router;
