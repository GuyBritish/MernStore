const Order = require("../models/orderModel");

const addOrder = async (req, res) => {
	// Needs backend verification
	const {
		items,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (items && items.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		const order = new Order({
			orderItems: items,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const newOrder = await order.save();

		res.status(201).json(newOrder);
	}
};

const getOrder = async (req, res) => {
	const order = await Order.findById(req.params.id).populate("user", "name", "email");

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
};

const getOrderById = async (req, res) => {
	const { id } = req.params;
	const order = await Order.findById(id).populate("user", "name email");

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
};

/* -------------------------------------------------------------------------- */

module.exports = { addOrder, getOrder, getOrderById };
