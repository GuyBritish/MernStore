import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { listProducts } from "../../actions/productActions";

import Product from "./Product";
import Loader from "../Interface/Loader";
import AlertMessage from "../Interface/AlertMessage";

import { Grid } from "@mui/material";

const ProductList = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => {
		return state.productList;
	});

	useEffect(() => {
		dispatch(listProducts(params.keyword, params.pageNumber));
	}, [dispatch, params]);

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
