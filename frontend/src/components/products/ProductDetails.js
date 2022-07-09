import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails, reviewProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

import { PRODUCT_REVIEW_RESET } from "../../constants/productConst";

import Rating from "../Interface/Rating";
import Loader from "../Interface/Loader";
import AlertMessage from "../Interface/AlertMessage";

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
	FilledInput,
	FormGroup,
} from "@mui/material";
import Meta from "../layout/Meta";

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

	const { success: successReview, error: errorReview } = useSelector((state) => {
		return state.productReview;
	});

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		if (successReview) {
			alert("Review Submitted!");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_REVIEW_RESET });
		}
		dispatch(listProductDetails(params.id));
	}, [dispatch, params.id, successReview]);

	const addToCartHandler = () => {
		dispatch(addToCart(prod._id, qty));
		navigate(`/cart`);
	};

	const reviewHandler = (e) => {
		e.preventDefault();
		dispatch(reviewProduct(params.id, { rating, comment }));
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
				<React.Fragment>
					<Meta title={prod.name} />
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
									<Rating
										rating={prod.rating}
										text={`${prod.numReviews} reviews`}
									/>
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
									sx={{
										width: "100%",
										maxWidth: 360,
										bgcolor: "background.paper",
									}}
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
												{prod.countInStock > 0
													? "In Stock"
													: "Out Of Stock"}
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
															{[
																...Array(prod.countInStock).keys(),
															].map((x) => {
																return (
																	<MenuItem
																		key={x + 1}
																		value={x + 1}
																	>
																		{x + 1}
																	</MenuItem>
																);
															})}
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
					<Grid container sx={{ pt: "1em" }}>
						<Grid item md={6}>
							<h3>Reviews</h3>
							{prod.reviews.length === 0 && <AlertMessage>No Reivews</AlertMessage>}
							<List>
								{prod.reviews.map((review) => {
									return (
										<React.Fragment>
											<ListItem className="mt-2" key={review._id}>
												<Stack>
													<Typography sx={{ typography: "subtitle2" }}>
														{review.name}
														{"  |  "}
														{review.createdAt.substring(0, 10)}
													</Typography>
													<Rating rating={review.rating} />
													<Typography
														className="my-3"
														sx={{ typography: "body" }}
													>
														{review.comment}
													</Typography>
												</Stack>
											</ListItem>
											<Divider />
										</React.Fragment>
									);
								})}
								<ListItem sx={{ padding: 0, marginTop: 2 }}>
									<Card sx={{ width: "100%" }} elevation={0}>
										<h3>Write a Customer Review</h3>
										{errorReview && (
											<AlertMessage variant="error">
												{errorReview}
											</AlertMessage>
										)}
										{userInfo ? (
											<form onSubmit={reviewHandler}>
												<FormGroup className="my-3">
													<InputLabel className="mb-2">
														<strong>Rating</strong>
													</InputLabel>
													<Select
														label="Rating"
														value={rating}
														onChange={(e) => setRating(e.target.value)}
														sx={{ height: "2rem" }}
													>
														<MenuItem value={1}>1 - Poor</MenuItem>
														<MenuItem value={2}>2 - Fair</MenuItem>
														<MenuItem value={3}>3 - Good</MenuItem>
														<MenuItem value={4}>4 - Very good</MenuItem>
														<MenuItem value={5}>5 - Excellent</MenuItem>
													</Select>
												</FormGroup>
												<FormGroup className="my-3">
													<InputLabel className="mb-2">
														<strong>Comment</strong>
													</InputLabel>
													<FilledInput
														type="text"
														id="description"
														size="small"
														sx={{ py: 1 }}
														hiddenLabel
														disableUnderline
														multiline
														rows={3}
														onChange={(e) => setComment(e.target.value)}
													/>
												</FormGroup>
												<Button type="submit" className="darkButton">
													Submit
												</Button>
											</form>
										) : (
											<AlertMessage>
												Please <Link to="/login">sign in</Link> to write a
												review
											</AlertMessage>
										)}
									</Card>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</div>
	);
};

export default ProductDetails;
