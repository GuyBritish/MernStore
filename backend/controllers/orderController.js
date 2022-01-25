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
			items,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingAddress,
			totalPrice,
		});

		const newOrder = await order.save();

		res.status(201).json(newOrder);
	}
};

/* -------------------------------------------------------------------------- */

module.exports = { addOrder };
