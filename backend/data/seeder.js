const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/database");

const users = require("./users");
const products = require("./products");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

/* -------------------------------------------------------------------------- */

dotenv.config();
connectDB();

const destroy = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data destroyed successfully!");
		process.exit();
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

const seed = async () => {
	try {
		const newUsers = await User.insertMany(users);
		const adminUser = newUsers[0]._id;

		const newProducts = products.map((prod) => {
			return { ...prod, user: adminUser };
		});
		await Product.insertMany(newProducts);

		console.log("Data seeded successfully!");
		process.exit();
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroy();
} else {
	seed();
}
