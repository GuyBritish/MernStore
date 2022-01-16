import React from "react";
import { Link } from "react-router-dom";

import Rating from "../UI/Rating";

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const Product = (props) => {
	const prod = props.product;
	return (
		<Card className="p-3 rounded" variant="outlined" elevation={0}>
			<Link to={`/products/${prod._id}`}>
				<CardMedia component="img" alt={`${prod.name} image`} image={`${prod.image}`} />
			</Link>
			<CardContent>
				<Link to={`/products/${prod._id}`} style={{ textDecoration: "none" }}>
					<Typography gutterBottom component="div" style={{ fontWeight: 500 }}>
						{prod.name}
					</Typography>
				</Link>
				<div className="my-3">
					<Rating rating={prod.rating} text={`${prod.numReviews} reviews`} />
				</div>
				<Typography variant="h5" style={{ fontWeight: 500 }}>
					${prod.price}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Product;
