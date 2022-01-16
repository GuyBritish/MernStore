import React from "react";
import { Link, useParams } from "react-router-dom";

import Rating from "../UI/Rating";
import products from "../../products";

import { Grid, Stack, Paper, Divider } from "@mui/material";

const ProductDetails = (props) => {
	const params = useParams();
	const prod = products.find((prod) => {
		return prod._id === params.id;
	});

	return (
		<div>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			<Grid container>
				<Grid item md={6}>
					<img
						src={prod.image}
						alt={prod.name}
						style={{ height: "100%", width: "100%" }}
					/>
				</Grid>
				<Grid item md={3}>
					<Stack spacing={2} sx={{ pl: 4 }}>
						<Paper elevation={0} sx={{ px: 2 }}>
							<h3>{prod.name}</h3>
						</Paper>
						<Divider />
						<Paper elevation={0} sx={{ px: 2 }}>
							<Rating rating={prod.rating} text={`${prod.numReviews} reviews`} />
						</Paper>
						<Divider />
						<Paper elevation={0} sx={{ px: 2 }}>
							Price: ${prod.price}
						</Paper>
						<Divider />
						<Paper elevation={0} sx={{ px: 2 }}>
							Description: {prod.description}
						</Paper>
					</Stack>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProductDetails;
