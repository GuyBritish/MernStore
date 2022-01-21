const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const control = require("../controllers/userController");

/* -------------------------------------------------------------------------- */

router.post("/login", catchAsync(control.authUser));

/* -------------------------------------------------------------------------- */

module.exports = router;
