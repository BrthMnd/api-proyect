const { Schema, model } = require("mongoose");

const ContractingStatusSchema = new Schema(
	{
		name: { type: String, unique: true, required: true },
		description: { type: String, required: true },
		status: { type: Boolean, default: true },
	},
	{
		versionKey: false, // __v: 0
	}
);

const ContractingStatus = model(
	"ContractingStatus",
	ContractingStatusSchema,
	"offers_ContractingStatus"
);

module.exports = ContractingStatus;
