const mongoose = require("mongoose");

const { ReviewSchema } = require("./reviewModel");

const ProductSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [ReviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

ProductSchema.virtual("thumbnail").get(function () {
	return this.image.replace("/upload", "/upload/w_640,h_510,c_scale");
});

const Product = mongoose.model("Product", ProductSchema);

/* -------------------------------------------------------------------------- */

module.exports = Product;
