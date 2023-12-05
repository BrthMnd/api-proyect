const {
  User_Controller,
} = require("../../controllers/users/users.controllers.js");
const User = new User_Controller();
const routes = require("express").Router();

routes.get("/", User.Get.bind());
routes.get("/:id", User.GetById.bind());
routes.post("/", User.PostEmployed.bind());
routes.put("/:id", User.Put.bind());
routes.delete("/:id", User.Delete.bind());
// Register
routes.post("/verificar_registro", User.registerVerify.bind());
routes.get("/confirmacion_correo/:token", User.VerifyConfirmToken.bind());
// password
routes.post("/recuperar_correo", User.CreateCodeToken.bind());
routes.post("/actualizar_contrasena", User.UpdatePassword.bind());
routes.post("/recuperar_correo/:tokenKey", User.VerifyCodeToken.bind());
// Login
routes.post("/registro", User.register.bind());
routes.post("/login", User.Login.bind());
routes.post("/logout", User.Logout.bind());
routes.post("/VerifyToken", User.VerifyToken.bind());
routes.post("/VerifyTokenMobile", User.VerifyTokenMobile.bind());

module.exports = routes;
