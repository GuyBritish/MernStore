const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");

/* -------------------------------------------------------------------------- */

const isAdmin = catchAsync(async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Admin permission required");
	}
});

/* -------------------------------------------------------------------------- */

module.exports = isAdmin;
