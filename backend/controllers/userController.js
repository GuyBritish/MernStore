const User = require("../models/userModel");

const generateToken = require("../utils/generateToken");

/* -------------------------------------------------------------------------- */

const addUser = async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		res.status(400);
		throw new Error("User already exists");
	}

	const newUser = await User.create({
		name,
		email,
		password,
	});

	if (newuser) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
};

const authUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
};

const getProfile = async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
};

/* -------------------------------------------------------------------------- */

module.exports = { addUser, authUser, getProfile };
