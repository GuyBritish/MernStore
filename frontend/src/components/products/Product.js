import React from "react";
import { Link } from "react-router-dom";

import Rating from "../Interface/Rating";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Product = (props) => {
	const prod = props.product;

	const formatSize = (url) => {
		const lastSlice = url.lastIndexOf("upload/") + 6;
		return url.slice(0, lastSlice) + "/w_500,h_500,c_scale" + url.slice(lastSlice);
	};

	return (
		<Card className="rounded" variant="outlined" elevation={0}>
			<Link to={`/products/${prod._id}`}>
				<CardMedia
					component="img"
					alt={`${prod.name} image`}
					image={`${formatSize(prod.image)}`}
				/>
			</Link>
			<CardContent>
				<Link to={`/products/${prod._id}`} className="cardlink">
					<Typography
						gutterBottom
						component="div"
						style={{ fontWeight: 500, height: "2em" }}
					>
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
