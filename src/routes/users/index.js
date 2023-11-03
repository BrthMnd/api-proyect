const router = require("express").Router();

const UserRoute = require("./users.routes");
const EmployedRoute = require("./employed.routes");
router.use("/usuario", UserRoute);
router.use("/empleado", EmployedRoute);

module.exports = router;
