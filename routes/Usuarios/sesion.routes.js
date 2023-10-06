const express = require("express");
const router = express.Router();
const { validateUser } = require("../../validations/sesionValidations");
const sesionController = require("../../controllers/sesionController");
const Controller = new sesionController();

router.post("/", validateUser, Controller.createUser.bind());
router.get("/", Controller.getUsersNoPassword.bind());
router.get("/all", Controller.getUsers.bind());
router.get("/email/:correo", Controller.getUserByEmail.bind());
router.post("/login", validateUser, Controller.login.bind());
router.post("/:rol", validateUser, Controller.createUserWithRole.bind());
router.get("/id/:id", Controller.getUserByID.bind());
router.put("/:id", validateUser, Controller.editUser.bind());
router.put("/password/:correo", Controller.editPassword.bind());
router.delete("/:id", Controller.deleteUser.bind());

module.exports = router;
