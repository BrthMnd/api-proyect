const { Schema, model } = require("mongoose");

const CandidateSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, unique: true, required: true },
  status: { type: Boolean, default: true },
});

const CandidateStatusModel = model(
  "CandidateStatus",
  CandidateSchema,
  "CandidateStatus"
);

module.exports = { CandidateStatusModel };
