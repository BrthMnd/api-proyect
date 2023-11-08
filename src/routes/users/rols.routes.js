const routes = require("express").Router()
const {  Rol_Controller} = require("../../controllers/users/rols.controller");
const Rols = new Rol_Controller()

routes.get("/",Rols.Get.bind() )
routes.get("/:id",Rols.GetById.bind() )
routes.post("/",Rols.Post.bind() )
routes.put("/:id",Rols.Put.bind() )
routes.delete("/:id",Rols.Delete.bind() )


module.exports = routes