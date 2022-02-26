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
		res.status(404);
		throw new Error("Product not found");
	}
};

const deleteOneProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (product) {
		await product.remove();
		res.json({ message: "Produce removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
};

const createProduct = async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample description",
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
	const params = req.params;
	const { name, price, image, brand, category, countInStock, numReviews, description } = req.body;

	const product = await Product.findById(params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.numReviews = numReviews;
		product.description = description;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
};

/* -------------------------------------------------------------------------- */

module.exports = { getProducts, getOneProduct, deleteOneProduct, createProduct, updateProduct };
