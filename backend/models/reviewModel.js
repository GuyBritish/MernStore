const mongoose = require("mongoose");

export const ReviewSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

/* -------------------------------------------------------------------------- */

module.exports = Review;
