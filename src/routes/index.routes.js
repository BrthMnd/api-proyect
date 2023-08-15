const router = require("express").Router();

const Prueba = require("./prueba.routes");
const estados = require("./Offers/status.routes");
const oferta = require("./Offers/offers.routes");
const EstadosDeContrato = require("./Offers/contratingStatus.routes");
const ofertas_estados = require("./Offers/offers_status.routes");
const Candidato = require("./Offers/candidate.routes");

router.use("/prueba", Prueba);
router.use("/estado", estados);
router.use("/oferta", oferta);
router.use("/estadosdecontrato", EstadosDeContrato);
router.use("/ofertas_estados", ofertas_estados);
router.use("/candidato", Candidato);

module.exports = router;
