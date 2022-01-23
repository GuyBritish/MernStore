const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");

/* -------------------------------------------------------------------------- */

const isAuth = catchAsync(async (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			const token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");
		} catch (err) {
			res.status(401);
			throw new Error("Unauthorized - token failed");
		}
	}

	if (!req.user) {
		res.status(401);
		throw new Error("Unauthorized - token missing");
	}

	next();
});

/* -------------------------------------------------------------------------- */

module.exports = isAuth;
