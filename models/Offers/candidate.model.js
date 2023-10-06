const { Schema, model } = require("mongoose");
const FechaActual = require("../../utils/tools/date.tools");
const Offers = require("./offers.model");
const CandidateStatus = require("./candidateStatus.model");
const Proveedores = require("../Proveedores/provedores.models");

const CandidateSchema = new Schema(
	{
		id_offers: {
			type: Schema.Types.ObjectId,
			ref: Offers.modelName,
			required: true,
		},
		id_ServiceProvider: [
			{
				type: Schema.Types.ObjectId,
				ref: Proveedores.modelName,
			},
		],
		id_CandidateStatus: {
			type: Schema.Types.ObjectId,
			ref: CandidateStatus.modelName,
			required: true,
			default: "651760a29407f722414e9d75",
		},
		DateApplied: { type: String, default: FechaActual },
	},
	{
		versionKey: false, // __v: 0
	}
);

const Candidate = model("Candidate", CandidateSchema, "offers_Candidate");

module.exports = Candidate;
