const getProducts = async (req, res) => {
	const products = require("../data/products");
	res.json(products);
};

const getOneProduct = async (req, res) => {
	const { id } = req.params;
	const products = require("../data/products");
	const product = products.find((prod) => {
		return prod._id === id;
	});
	res.json(product);
};

/* -------------------------------------------------------------------------- */

module.exports = { getProducts, getOneProduct };
