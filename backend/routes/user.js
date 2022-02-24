const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const isAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const control = require("../controllers/userController");

/* -------------------------------------------------------------------------- */

router.get("/", isAuth, isAdmin, catchAsync(control.getUsers));

router.post("/", catchAsync(control.addUser));

router.post("/login", catchAsync(control.authUser));

router.get("/profile", isAuth, catchAsync(control.getProfile));

router.put("/profile", isAuth, catchAsync(control.updateProfile));

router.get("/:id", isAuth, isAdmin, catchAsync(control.getUserById));

router.put("/:id", isAuth, isAdmin, catchAsync(control.updateUser));

router.delete("/:id", isAuth, isAdmin, catchAsync(control.deleteUser));

/* -------------------------------------------------------------------------- */

module.exports = router;
