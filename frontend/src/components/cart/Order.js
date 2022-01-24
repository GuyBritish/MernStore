import React, { useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AlertMessage from "../UI/AlertMessage";

import { savePaymentMethod } from "../../actions/cartActions";

import { Grid, Link, List, ListItem, Typography, Divider } from "@mui/material";

const Order = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cartCtx = useSelector((state) => {
		return state.cart;
	});

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
		</Grid>
	);
};

export default Order;
