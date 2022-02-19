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

	if (newUser) {
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

const updateProfile = async (req, res) => {
	const user = await User.findById(req.body._id);

	if (req.body.email && req.body.email !== user.email) {
		const emailUser = await User.findOne({ email: req.body.email });

		if (emailUser) {
			res.status(400);
			throw new Error("User with this email address already exists");
		}
	}

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
};

const getUsers = async (req, res) => {
	const users = await User.find({});

	res.json(users);
};

const deleteUser = async (req, res) => {
	const params = req.params;
	const user = await User.findById(params.id);

	if (user) {
		await user.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
};

/* -------------------------------------------------------------------------- */

module.exports = { addUser, authUser, getProfile, updateProfile, getUsers, deleteUser };
