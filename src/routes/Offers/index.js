const router = require("express").Router();

const OfferRoute = require("./offers.routes");
const CandidateRoute = require("./candidate.routes");
const ContractingRoute = require("./contracting.routes");
const statusOffert = require('./offerStatus.routes')
router.use("/oferta", OfferRoute);
router.use("/candidato", CandidateRoute);
router.use("/contrato", ContractingRoute);
router.use("/estado_oferta", statusOffert);

module.exports = router;
