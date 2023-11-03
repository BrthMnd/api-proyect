const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { PermissionModel } = require("./permissions.models");
const rolUserSchema = new Schema({
  rolName: { type: String, unique: true, require: true },
  id_Permissions:  {
    type: Schema.Types.ObjectId,
    ref: PermissionModel.modelName,
  } 
});

const RolModel = mongoose.model(
  "Rol",
  rolUserSchema,
  "user_rol"
);

module.exports = {
  RolModel,
};
