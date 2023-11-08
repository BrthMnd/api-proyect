const router = require("express").Router();
const {
  PermissionController,
} = require("../../controllers/users/permissions.controller");
const permision = new PermissionController();

router.get("/", permision.Get.bind());
router.get("/:id", permision.GetById.bind());
router.post("/", permision.postPermission.bind());
router.put("/:id", permision.putPermission.bind());
router.delete("/:id", permision.deletePermission.bind());

module.exports = router;
