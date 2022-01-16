const getProducts = async (req, res) => {
	const products = require("../products");
	res.json(products);
};

/* -------------------------------------------------------------------------- */

module.exports = { getProducts };
