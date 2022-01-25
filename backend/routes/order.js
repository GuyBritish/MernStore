const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const isAuth = require("../middleware/authMiddleware");

const control = require("../controllers/orderController");

/* -------------------------------------------------------------------------- */

router.post("/", isAuth, catchAsync(control.addOrder));

/* -------------------------------------------------------------------------- */

module.exports = router;
