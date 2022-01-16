const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const control = require("../controllers/productController");

/* -------------------------------------------------------------------------- */

router.get("/", catchAsync(control.getProducts));

/* -------------------------------------------------------------------------- */

module.exports = router;
