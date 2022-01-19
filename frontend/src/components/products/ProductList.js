import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../../actions/productActions";

import Product from "./Product";
import Loader from "../UI/Loader";
import AlertMessage from "../UI/AlertMessage";

import { Grid } from "@mui/material";

const ProductList = () => {
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => {
		return state.productList;
	});

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<AlertMessage variant="error">{error}</AlertMessage>
			) : (
				<Grid container className="my-3" spacing={3}>
					{products.map((prod) => {
						return (
							<Grid item key={prod._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={prod} />
							</Grid>
						);
					})}
				</Grid>
			)}
		</React.Fragment>
	);
};

export default ProductList;
