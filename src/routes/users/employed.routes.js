const {
  Employed_Controller,
} = require("../../controllers/users/employed.controllers");
const Employed = new Employed_Controller();
const routes = require("express").Router();

routes.get("/", Employed.Get.bind());
routes.get("/:id", Employed.GetById.bind());
// routes.post("/", Employed.Post.bind());
routes.put("/:id", Employed.Put.bind());
routes.delete("/:id", Employed.Delete.bind());
module.exports = routes;
