import React, { useState, useEffect } from "react";

import Product from "./Product";

import { Grid } from "@mui/material";

const axios = require("axios");

const ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const options = {
				url: "/api/products",
			};
			const resp = await axios(options);
			setProducts(resp.data);
		};

		fetchProducts();
	}, []);

	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			<Grid container className="my-3" spacing={3}>
				{products.map((prod) => {
					return (
						<Grid item key={prod._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={prod} />
						</Grid>
					);
				})}
			</Grid>
		</React.Fragment>
	);
};

export default ProductList;
