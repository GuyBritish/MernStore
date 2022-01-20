import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

import Rating from "../UI/Rating";
import Loader from "../UI/Loader";
import AlertMessage from "../UI/AlertMessage";

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
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from "@mui/material";

const ProductDetails = (props) => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		loading,
		error,
		product: prod,
	} = useSelector((state) => {
		return state.productDetails;
	});

	const [qty, setQty] = useState(1);

	useEffect(() => {
		dispatch(listProductDetails(params.id));
	}, [dispatch, params.id]);

	const addToCartHandler = () => {
		dispatch(addToCart(prod._id, qty));
		navigate(`/cart`);
	};

	return (
		<div>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<AlertMessage variant="error">{error}</AlertMessage>
			) : (
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
								<Typography fontSize="1rem">
									Description: {prod.description}
								</Typography>
							</Paper>
						</Stack>
					</Grid>
					<Grid item md={3}>
						<Card variant="outlined" sx={{ ml: 2 }}>
							<List
								sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
							>
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
								{prod.countInStock > 0 && (
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												Quantity:
											</Grid>
											<Grid item xs={6}>
												<FormControl fullWidth>
													<InputLabel id="qty-select-label">
														Quantity
													</InputLabel>
													<Select
														labelId="qty-select-label"
														id="qty-select-label"
														value={qty}
														label="Quantity"
														onChange={(event) => {
															setQty(event.target.value);
														}}
													>
														{[...Array(prod.countInStock).keys()].map(
															(x) => {
																return (
																	<MenuItem
																		key={x + 1}
																		value={x + 1}
																	>
																		{x + 1}
																	</MenuItem>
																);
															}
														)}
													</Select>
												</FormControl>
											</Grid>
										</Grid>
									</ListItem>
								)}
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
											onClick={addToCartHandler}
										>
											Add To Cart
										</Button>
									</Grid>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default ProductDetails;
