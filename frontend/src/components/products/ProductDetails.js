import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Rating from "../UI/Rating";

import {
	Grid,
	Stack,
	Paper,
	Divider,
	List,
	ListItem,
	Card,
	Button,
	Typography,
} from "@mui/material";

const axios = require("axios");

const ProductDetails = (props) => {
	const params = useParams();
	const [prod, setProd] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			const options = {
				url: `/api/products/${params.id}`,
			};
			const resp = await axios(options);
			setProd(resp.data);
		};

		fetchProduct();
	}, [params.id]);

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
						style={{ height: "100%", width: "100%", padding: "2" }}
					/>
				</Grid>
				<Grid item md={3}>
					<Stack spacing={2} sx={{ px: 2 }}>
						<Paper elevation={0} sx={{ px: 2 }}>
							<h3>{prod.name}</h3>
						</Paper>
						<Divider />
						<Paper elevation={0} sx={{ px: 2 }}>
							<Rating rating={prod.rating} text={`${prod.numReviews} reviews`} />
						</Paper>
						<Divider />
						<Paper elevation={0} sx={{ px: 2 }}>
							<Typography fontSize="1rem">Price: ${prod.price}</Typography>
						</Paper>
						<Divider />
						<Paper elevation={0} sx={{ px: 2 }}>
							<Typography fontSize="1rem">Description: {prod.description}</Typography>
						</Paper>
					</Stack>
				</Grid>
				<Grid item md={3}>
					<Card variant="outlined" sx={{ ml: 2 }}>
						<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										Price:
									</Grid>
									<Grid item xs={6}>
										${prod.price}
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										Status:
									</Grid>
									<Grid item xs={6}>
										{prod.countInStock > 0 ? "In Stock" : "Out Of Stock"}
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container justifyContent="center">
									<Button
										sx={{
											flexGrow: 1,
											mx: 1,
											display: "block",
											color: "inherit",
											backgroundColor: "inherit",
										}}
										className="darkButton"
										variant="contained"
										disableElevation
										disabled={prod.countInStock === 0}
									>
										Add To Cart
									</Button>
								</Grid>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProductDetails;
