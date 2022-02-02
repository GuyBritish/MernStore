import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails } from "../../actions/orderActions";

import Loader from "../UI/Loader";
import AlertMessage from "../UI/AlertMessage";

import { Grid, List, ListItem, Typography, Divider, Card } from "@mui/material";

const OrderDetails = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const { order, loading, error } = useSelector((state) => {
		return state.orderDetails;
	});

	useEffect(() => {
		dispatch(getOrderDetails(params.id));
	}, [dispatch, params]);

	return (
		<React.Fragment>
			{loading && <Loader />}
			{error && <AlertMessage variant="error">{error}</AlertMessage>}
			{!loading && !error && (
				<React.Fragment>
					<h1>Order {order._id}</h1>
					<Grid container>
						<Grid item md={8}>
							<List sx={{ width: "100%", bgcolor: "background.paper" }}>
								<ListItem sx={{ marginY: 1 }}>
									<div>
										<h3>Shipping</h3>
										<Typography sx={{ my: 2 }}>
											<strong>Name: </strong>
											{order.user.name}
										</Typography>
										<Typography sx={{ mb: 2 }}>
											<strong>Email: </strong>
											{order.user.email}
										</Typography>
										<Typography sx={{ mb: 1 }}>
											<strong>Address: </strong>
											{order.shippingAddress.address},{" "}
											{order.shippingAddress.city}{" "}
											{order.shippingAddress.postalCode},{" "}
											{order.shippingAddress.country}
										</Typography>
										{order.isDelivered ? (
											<AlertMessage variant="success">
												Delivered on {order.deliveredAt}
											</AlertMessage>
										) : (
											<AlertMessage variant="warning">
												Not yet delivered
											</AlertMessage>
										)}
									</div>
								</ListItem>
								<Divider />
								<ListItem sx={{ marginY: 1 }}>
									<div>
										<h3>Payment</h3>
										<Typography sx={{ mt: 2, mb: 1 }}>
											<strong>Method: </strong>
											{order.paymentMethod}
										</Typography>
										{order.isPaid ? (
											<AlertMessage variant="success">
												Paid on {order.paidAt}
											</AlertMessage>
										) : (
											<AlertMessage variant="warning">
												Not yet paid
											</AlertMessage>
										)}
									</div>
								</ListItem>
								<Divider />
								<ListItem sx={{ marginY: 1 }}>
									<div>
										<h3>Order Items</h3>
										{order.orderItems.length === 0 ? (
											<AlertMessage variant="info">
												Your cart is empty
											</AlertMessage>
										) : (
											<List
												sx={{ width: "100%", bgcolor: "background.paper" }}
											>
												{order.orderItems.map((item) => {
													return (
														<React.Fragment key={item.id}>
															<ListItem>
																<Grid container>
																	<Grid item md={1}>
																		<img
																			src={item.image}
																			alt={item.name}
																			style={{
																				maxHeight: "100%",
																				maxWidth: "100%",
																				borderRadius:
																					"10px",
																			}}
																		/>
																	</Grid>
																	<Grid item ml={2} flexGrow={1}>
																		<Link
																			to={`/products/${item.id}`}
																			className="cardlink"
																			sx={{
																				textDecoration:
																					"none",
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
																		{item.qty} x ${item.price} =
																		${item.qty * item.price}
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
												${order.itemsPrice.toFixed(2)}
											</Grid>
										</Grid>
									</ListItem>
									<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
										<Grid container>
											<Grid item md={6}>
												Shipping:
											</Grid>
											<Grid item md={6}>
												${order.shippingPrice.toFixed(2)}
											</Grid>
										</Grid>
									</ListItem>
									<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
										<Grid container>
											<Grid item md={6}>
												Tax:
											</Grid>
											<Grid item md={6}>
												${order.taxPrice.toFixed(2)}
											</Grid>
										</Grid>
									</ListItem>
									<ListItem divider sx={{ borderBottomWidth: 2, py: 2 }}>
										<Grid container>
											<Grid item md={6}>
												Total:
											</Grid>
											<Grid item md={6}>
												${order.totalPrice.toFixed(2)}
											</Grid>
										</Grid>
									</ListItem>
								</List>
							</Card>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default OrderDetails;
