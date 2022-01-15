import React from "react";

import products from "../../products";

import { Grid } from "@mui/material";

const ProductList = () => {
	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			<Grid container>
				{products.map((prod) => {
					return (
						<Grid item sm={12} md={6} lg={4} xl={3}>
							<h3>{prod.name}</h3>
						</Grid>
					);
				})}
			</Grid>
		</React.Fragment>
	);
};

export default ProductList;
