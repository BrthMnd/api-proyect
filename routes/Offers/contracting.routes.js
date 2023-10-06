const router = require("express").Router();
const Contracting_Controller = require("../../controllers/Offers/contracting.controller");
const Contracting = new Contracting_Controller();

router.get("/", Contracting.getStatus.bind());
router.get("/:id", Contracting.getIdStatus.bind());
router.post("/", Contracting.postStatus.bind());
router.put("/:id", Contracting.putStatus.bind());
router.delete("/:id", Contracting.deleteStatus.bind());

module.exports = router;
