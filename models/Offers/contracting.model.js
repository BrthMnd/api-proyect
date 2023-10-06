const { Schema, model } = require("mongoose");
const Candidate = require("./candidate.model");
const ContractingStatus = require("./contractingStatus.modal");
const FechaActual = require("../../utils/tools/date.tools");

const ContractingSchema = new Schema(
	{
		id_candidates: {
			type: Schema.Types.ObjectId,
			ref: Candidate.modelName,
		},
		id_contractingStatus: {
			type: Schema.Types.ObjectId,
			ref: ContractingStatus.modelName,
			default: "651794f70948970924381ad5",
		},
		DateApplied: { type: String, default: FechaActual },
	},
	{
		versionKey: false, // __v: 0
	}
);

const Contracting = model(
	"ContractingModal",
	ContractingSchema,
	"offers_Contracting"
);

module.exports = Contracting;
