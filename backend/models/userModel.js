const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

/* -------------------------------------------------------------------------- */

module.exports = User;
