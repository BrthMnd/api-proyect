const { Schema, model } = require("mongoose");


const userPermissionsSchema = new Schema({
  permissionName: { type: String, unique: true, require: true, trim: true },
  
});

const PermissionModel = model(
  "Permission",
  userPermissionsSchema,
  "user_permission"
);

module.exports = { PermissionModel }; // models
