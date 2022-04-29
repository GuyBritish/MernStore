const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

/* -------------------------------------------------------------------------- */

module.exports = { Review, ReviewSchema };
