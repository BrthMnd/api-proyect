const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

const StatusModel = mongoose.model("StatusOffers", StatusSchema);

module.exports = { StatusModel };
