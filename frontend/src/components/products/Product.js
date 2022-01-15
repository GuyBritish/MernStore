import React from "react";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Product = (props) => {
	const prod = props.product;
	return (
		<Card className="p-3 rounded" variant="outlined" elevation={0}>
			<a href={`/products/${prod._id}`}>
				<CardMedia component="img" alt={`${prod.name} image`} image={`${prod.image}`} />
			</a>
			<CardContent>
				<a href={`/products/${prod._id}`} style={{ textDecoration: "none" }}>
					<Typography gutterBottom variant="strong" component="div" color="text.primary">
						{prod.name}
					</Typography>
				</a>
				<div className="my-3">
					<Typography variant="body2">
						{prod.rating} from {prod.numReviews} reviews
					</Typography>
				</div>
				<Typography variant="h4">${prod.price}</Typography>
			</CardContent>
		</Card>
	);
};

export default Product;
