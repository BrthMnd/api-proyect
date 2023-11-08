const { Schema, model } = require("mongoose");
const { Employed_Model } = require("./employed.models");
const { ProveedoresModels } = require("../Proveedores/provedores.models");
const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  status: { type: Boolean, default: true },
  role: {
    type: String,
    enum: [Employed_Model.modelName, ProveedoresModels.modelName],
    required: true,
  },
  roleRef: {
    type: Schema.Types.ObjectId,
    refPath: "role",
  },
});

const UserModel = model("user", UserSchema, "user_User");

module.exports = {
  UserModel,
};
