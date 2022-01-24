import React, { useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AlertMessage from "../UI/AlertMessage";

import { savePaymentMethod } from "../../actions/cartActions";

import { Grid, Link, List, ListItem, Typography, Divider, Card, Button } from "@mui/material";

const Order = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cartCtx = useSelector((state) => {
		return state.cart;
	});

	const placeOrderHandler = () => {};

	return (
		<Grid container>
			<Grid item md={8}>
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>
					<ListItem sx={{ marginY: 1 }}>
						<div>
							<h3>Shipping</h3>
							<Typography>
								<strong>Address: </strong>
								{cartCtx.shippingAddress.address}, {cartCtx.shippingAddress.city}{" "}
								{cartCtx.shippingAddress.postalCode},{" "}
								{cartCtx.shippingAddress.country}
							</Typography>
						</div>
					</ListItem>
					<Divider />
					<ListItem sx={{ marginY: 1 }}>
						<div>
							<h3>Payment</h3>
							<Typography>
								<strong>Method: </strong>
								{cartCtx.paymentMethod}
							</Typography>
						</div>
					</ListItem>
					<Divider />
					<ListItem sx={{ marginY: 1 }}>
						<div>
							<h3>Order Items</h3>
							{cartCtx.cartItems.length === 0 ? (
								<AlertMessage variant="info">Your cart is empty</AlertMessage>
							) : (
								<List sx={{ width: "100%", bgcolor: "background.paper" }}>
									{cartCtx.cartItems.map((item, index) => {
										return (
											<React.Fragment key={index}>
												<ListItem>
													<Grid container>
														<Grid item md={1}>
															<img
																src={item.image}
																alt={item.name}
																style={{
																	maxHeight: "100%",
																	maxWidth: "100%",
																	borderRadius: "10px",
																}}
															/>
														</Grid>
														<Grid item ml={2} flexGrow={1}>
															<Link
																to={`/products/${item._id}`}
																className="cardlink"
																sx={{
																	textDecoration: "none",
																	color: "inherit",
																}}
															>
																<Typography
																	gutterBottom
																	component="div"
																	style={{
																		fontWeight: 500,
																	}}
																>
																	{item.name}
																</Typography>
															</Link>
														</Grid>
														<Grid item md={4}>
															{item.qty} x ${item.price} = $
															{item.qty * item.price}
														</Grid>
													</Grid>
												</ListItem>
												<Divider />
											</React.Fragment>
										);
									})}
								</List>
							)}
						</div>
					</ListItem>
				</List>
			</Grid>

			<Grid item md={4}>
				<Card variant="outlined" sx={{ ml: 2 }}>
					<List sx={{ width: "100%", bgcolor: "background.paper", pb: 0 }}>
						<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
							<h2>Order Summary</h2>
						</ListItem>
						<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
							<Grid container>
								<Grid item md={6}>
									Items:
								</Grid>
								<Grid item md={6}>
									${cartCtx.itemsPrice}
								</Grid>
							</Grid>
						</ListItem>
						<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
							<Grid container>
								<Grid item md={6}>
									Shipping:
								</Grid>
								<Grid item md={6}>
									${cartCtx.shippingPrice}
								</Grid>
							</Grid>
						</ListItem>
						<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
							<Grid container>
								<Grid item md={6}>
									Tax:
								</Grid>
								<Grid item md={6}>
									${cartCtx.TaxPrice}
								</Grid>
							</Grid>
						</ListItem>
						<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
							<Grid container>
								<Grid item md={6}>
									Total:
								</Grid>
								<Grid item md={6}>
									${cartCtx.totalPrice}
								</Grid>
							</Grid>
						</ListItem>
						<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
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
									disabled={cartCtx.cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</Grid>
						</ListItem>
					</List>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Order;
