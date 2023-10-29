const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { RolModel } = require("./rols.models");
const UserSchema = new Schema({
  userName: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  Rols: {
    type: Schema.Types.ObjectId,
    ref: RolModel.modelName,
  },
});

const UserModel = mongoose.model(
  "user",
  UserSchema,
  "user_user"
);

module.exports = {
  UserModel,
};
