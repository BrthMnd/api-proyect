const router = require("express").Router();

const Prueba = require("./prueba.routes");
const estados = require("./Offers/status.routes");
const oferta = require("./Offers/offers.routes");
const EstadosDeContrato = require("./Offers/contratingStatus.routes");
const ofertas_estados = require("./Offers/offers_status.routes");
const Candidato = require("./Offers/candidate.routes");
const ofertas_servicios = require("./Offers/offers_service.routes");

router.use("/candidato", Candidato);
module.exports = router;
