const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const User = mongoose.model("User", UserSchema);

/* -------------------------------------------------------------------------- */

module.exports = User;
