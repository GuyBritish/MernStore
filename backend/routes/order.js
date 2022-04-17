const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const isAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const control = require("../controllers/orderController");

/* -------------------------------------------------------------------------- */

router.get("/", isAuth, isAdmin, catchAsync(control.getOrders));

router.post("/", isAuth, catchAsync(control.addOrder));

router.get("/myorders", isAuth, catchAsync(control.getUserOrders));

router.get("/:id", isAuth, catchAsync(control.getOrderById));

router.put("/:id/pay", isAuth, catchAsync(control.setOderPaid));

/* -------------------------------------------------------------------------- */

module.exports = router;
