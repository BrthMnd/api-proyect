const express = require("express");
const {
	validatePermiso,
	validateRole,
	validateAssignPermisoToUser,
	validateAssignRoleToUser,
} = require("../../validations/sesionValidations");
const rolController = require("../../controllers/rolController");
const router = express.Router();
const Controller = new rolController();

router.get("/roles", Controller.getRoles.bind());
router.get("/permisos", Controller.getPermissions.bind());
router.get("/lista-roles-usuarios", Controller.getUserRolesList.bind());
router.get("/permision/:id/users", Controller.getUsuariosWithPermission.bind());
router.get(
	"/lista-permisos-usuarios",
	Controller.getUsuariosPermissionsList.bind()
);
router.post("/roles", validateRole, Controller.createRole.bind());
router.post("/permisos", validatePermiso, Controller.createPermission.bind());
router.post(
	"/usuarios/:id_usuario/permisos/:id_permiso",
	validateAssignPermisoToUser,
	Controller.givePermissionToUser.bind()
);
router.post(
	"/usuarios/:id_usuario/roles/:roleId",
	validateAssignRoleToUser,
	Controller.giveRoleToUser.bind()
);
router.delete(
	"/usuarios/:userId/permisos/:permisoId",
	Controller.removePermission.bind()
);
router.delete("/usuarios/:userId/roles", Controller.revokeRoleFromUser.bind());
router.get(
	"/usuarios/:userId/permisos",
	Controller.getPermissionsFromUser.bind()
);
router.get("/role/:id", Controller.getRoleByID.bind());
router.put("/role/:id", validateRole, Controller.editRole.bind());
router.get("/permision/:id", Controller.editPermission.bind());
router.put(
	"/permision/:id",
	validatePermiso,
	Controller.getPermissionByID.bind()
);
router.delete("/role/:id", Controller.deleteRole.bind());
router.delete("/permiso/:id", Controller.deletePermission.bind());

module.exports = router;
