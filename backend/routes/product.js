const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const isAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const control = require("../controllers/productController");

/* -------------------------------------------------------------------------- */

router.get("/", catchAsync(control.getProducts));

router.get("/:id", catchAsync(control.getOneProduct));

router.post("/", isAuth, isAdmin, catchAsync(control.createProduct));

router.put("/:id", isAuth, isAdmin, catchAsync(control.updateProduct));

router.delete("/:id", isAuth, isAdmin, catchAsync(control.deleteOneProduct));

/* -------------------------------------------------------------------------- */

module.exports = router;
