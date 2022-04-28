import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, resolvePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, payOrder, deliverOrder } from "../../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConst";

import Loader from "../Interface/Loader";
import AlertMessage from "../Interface/AlertMessage";

import { Grid, List, ListItem, Typography, Divider, Card, Button } from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";

import axios from "axios";

const OrderDetails = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [SDKReady, setSDKReady] = useState(false);

	const { order, loading, error } = useSelector((state) => {
		return state.orderDetails;
	});

	const { success: successPay, loading: loadingPay } = useSelector((state) => {
		return state.orderPay;
	});

	const { success: successDeliver, loading: loadingDeliver } = useSelector((state) => {
		return state.orderDeliver;
	});

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	useEffect(() => {
		if (!userInfo) {
			navigate(resolvePath("/login"), { replace: true });
		}
		const addPayPalScript = async () => {
			const options = {
				url: "/api/payment/config/paypal",
			};
			const resp = await axios(options);
			const PayPalScript = document.createElement("script");
			PayPalScript.type = "text/javascript";
			PayPalScript.src = `https://www.paypal.com/sdk/js?client-id=${resp.data}`;
			PayPalScript.async = true;
			PayPalScript.onload = () => {
				setSDKReady(true);
			};
			document.body.appendChild(PayPalScript);
		};

		if (!order || order._id !== params.id || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(params.id));
		} else {
			if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript();
				} else {
					setSDKReady(true);
				}
			}
		}
	}, [dispatch, params, order, successPay, successDeliver, userInfo, navigate]);

	const paymentSuccesHandler = (paymentResult) => {
		dispatch(payOrder(params.id, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

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
									{!order.isPaid && (
										<ListItem
											sx={{ borderBottomWidth: 2, pt: 2, px: 0 }}
											style={{ display: "flex", justifyContent: "center" }}
										>
											{loadingPay && <Loader />}
											{!SDKReady ? (
												<Loader />
											) : (
												<PayPalButton
													amount={order.totalPrice.toFixed(2)}
													onSuccess={paymentSuccesHandler}
												/>
											)}
										</ListItem>
									)}

									{loadingDeliver && <Loader />}
									{userInfo &&
										userInfo.isAdmin &&
										order.isPaid &&
										!order.isDelivered && (
											<ListItem
												sx={{ borderBottomWidth: 2, pt: 2, px: 0 }}
												style={{
													display: "flex",
													justifyContent: "center",
												}}
											>
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
													onClick={deliverHandler}
												>
													Mark as delivered
												</Button>
											</ListItem>
										)}
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
