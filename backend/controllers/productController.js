const Product = require("../models/productModel");

const getProducts = async (req, res) => {
	const products = await Product.find({});
	res.json(products);
};

const getOneProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
};

/* -------------------------------------------------------------------------- */

module.exports = { getProducts, getOneProduct };
