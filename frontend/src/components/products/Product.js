import React from "react";

import { Card, CardMedia } from "@mui/material";

const Product = (props) => {
	return (
		<Card className="p-3 rounded" variant="outlined" elevation={0}>
			<a href={`/products/${props.product._id}`}>
				<CardMedia
					component="img"
					alt={`${props.product.name} image`}
					image={`${props.product.image}`}
				/>
			</a>
		</Card>
	);
};

export default Product;
