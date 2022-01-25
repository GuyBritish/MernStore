const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const control = require("../controllers/orderController");

/* -------------------------------------------------------------------------- */

router.post("/", protect, catchAsync(control.addOrder));

/* -------------------------------------------------------------------------- */

module.exports = router;
