const router = require("express").Router();

const OfferRoute = require("./offers.routes");
const CandidateStatusRoute = require("./candidateStatus.routes");
const ContractingStatusRoute = require("./contractingStatus.routes");
// const estados = require("./status.routes");
// const ofertas_servicios = require("./offers_service.routes");

router.use("/oferta", OfferRoute);
router.use("/estado_candidato", CandidateStatusRoute);
router.use("/estado_contrato", ContractingStatusRoute);
// router.use("/candidato", candidate);
// router.use("/contrato", contract);

module.exports = router;
