const { Schema, model } = require("mongoose");

const OffersStatus_Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    unique: true,
    trim: true,
  },
  description: { type: String, required: true },
  estado: { type: Boolean, default: true },
  orden: { type: Number, require: true },
});

const OffersStatus_Model = model(
  "OfferStatus",
  OffersStatus_Schema,
  "offers_OfferStatus"
);

module.exports = { OffersStatus_Model };
