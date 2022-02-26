const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const isAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const control = require("../controllers/productController");

/* -------------------------------------------------------------------------- */

router.get("/", catchAsync(control.getProducts));

router.get("/:id", catchAsync(control.getOneProduct));

router.delete("/:id", isAuth, isAdmin, catchAsync(control.deleteOneProduct));

/* -------------------------------------------------------------------------- */

module.exports = router;
