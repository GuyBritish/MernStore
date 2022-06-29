const Product = require("../models/productModel");

const getProducts = async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};
	const products = await Product.find(keyword);
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
		image: "https://res.cloudinary.com/dqttprqho/image/upload/v1650177555/MernStore/sample_mtr5p0.jpg",
		brand: "Sample brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		rating: 0,
		description: "Sample description",
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
	const params = req.params;
	const { name, price, image, brand, category, countInStock, description } = req.body;

	const product = await Product.findById(params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.image = req.file ? req.file.path : image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.description = description;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
};

const createProductReview = async (req, res) => {
	const params = req.params;
	const { rating, comment } = req.body;

	const product = await Product.findById(params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find((review) => {
			return review.user.toString() === req.user._id.toString();
		});

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((total, item) => {
				return item.rating + rating;
			}, 0) / product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
};

/* -------------------------------------------------------------------------- */

module.exports = {
	getProducts,
	getOneProduct,
	deleteOneProduct,
	createProduct,
	updateProduct,
	createProductReview,
};
