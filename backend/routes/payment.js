const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const control = require("../controllers/paymentController");

/* -------------------------------------------------------------------------- */

router.get("/config/paypal", catchAsync(control.getPayPalClientID));

/* -------------------------------------------------------------------------- */

module.exports = router;
