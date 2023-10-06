const { Schema, model } = require("mongoose");

const CandidateSchema = new Schema(
	{
		name: { type: String, unique: true, required: true },
		description: { type: String, required: true },
		status: { type: Boolean, default: true },
	},
	{
		versionKey: false, // __v: 0
	}
);

const CandidateStatus = model(
	"CandidateStatus",
	CandidateSchema,
	"offers_CandidateStatus"
);

module.exports = CandidateStatus;
