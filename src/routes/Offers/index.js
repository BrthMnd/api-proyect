const router = require("express").Router();

const candidate = require("./candidate.routes");
const estados = require("./status.routes");
const oferta = require("./offers.routes");
const EstadosDeContrato = require("./contratingStatus.routes");
const ofertas_servicios = require("./offers_service.routes");

router.use("/candidato", candidate);
router.use("/estado", estados);
router.use("/oferta", oferta);
router.use("/estadoDeContrato", EstadosDeContrato);
router.use("/oferta_servicio", ofertas_servicios);

module.exports = router;
