const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const isAuth = require("../middleware/authMiddleware");

const control = require("../controllers/userController");

/* -------------------------------------------------------------------------- */

router.post("/", catchAsync(control.addUser));

router.post("/login", catchAsync(control.authUser));

router.get("/profile", isAuth, catchAsync(control.getProfile));

/* -------------------------------------------------------------------------- */

module.exports = router;
