const {
  User_Controller,
} = require("../../controllers/users/users.controllers.js");
const User = new User_Controller();
const routes = require("express").Router();

routes.get("/", User.Get.bind());
routes.get("/:id", User.GetById.bind());
routes.post("/", User.Post.bind());
routes.put("/:id", User.Put.bind());
routes.delete("/:id", User.Delete.bind());
// LOGIN
routes.post("/registro", User.register.bind());
routes.post("/verificar_registro", User.registerVerify.bind());
routes.post("/login", User.Login.bind());
routes.post("/logout", User.Logout.bind());
routes.post("/VerifyToken", User.VerifyToken.bind());
routes.post("/VerifyTokenMobile", User.VerifyTokenMobile.bind());

module.exports = routes;
