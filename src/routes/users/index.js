const router = require("express").Router();

const PermissionRoute= require("./permission.routes");
const RolsRoute= require("./rols.routes");
const UserRoute= require("./users.routes");

router.use("/permiso", PermissionRoute);
router.use("/rol", RolsRoute);
router.use("/usuario", UserRoute);

module.exports = router;
