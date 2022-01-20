import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../actions/cartActions";

import AlertMessage from "../UI/AlertMessage";

import {
	Grid,
	List,
	ListItem,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Typography,
} from "@mui/material";

const Cart = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => {
		return state.cart;
	});

	const addToCartHandler = (id, quantity) => {
		dispatch(addToCart(id, quantity));
		navigate(`/cart`);
	};

	const removeFromCartHandler = () => {
		console.log("remove");
	};

	return (
		<Grid container>
			<Grid item md={8}>
				<h1>Shopping Cart</h1>
				{cart.cartItems.length === 0 ? (
					<AlertMessage>
						Your cart is empty. <Link to="/">Go Back</Link>
					</AlertMessage>
				) : (
					<List sx={{ width: "100%", maxHeight: 360, bgcolor: "background.paper" }}>
						{cart.cartItems.map((item) => {
							return (
								<React.Fragment key={item.id}>
									<ListItem alignItems="flex-start">
										<Grid container>
											<Grid item md={2} sx={{ px: 2 }}>
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
											<Grid item md={3}>
												<Link
													to={`/products/${item.id}`}
													className="cardlink"
												>
													<Typography>{item.name}</Typography>
												</Link>
											</Grid>
											<Grid item md={2} textAlign={"center"}>
												<Typography fontSize={"1.15rem"}>
													${item.price}
												</Typography>
											</Grid>
											<Grid item md={2} sx={{ m: "auto" }}>
												<FormControl fullWidth>
													<InputLabel id="qty-select-label">
														Quantity
													</InputLabel>
													<Select
														labelId="qty-select-label"
														id="qty-select-label"
														value={item.qty}
														label="Quantity"
														onChange={(event) => {
															addToCartHandler(
																item.id,
																Number(event.target.value)
															);
														}}
													>
														{[...Array(item.countInStock).keys()].map(
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
											<Grid item md={2} style={{ display: "flex" }}>
												<Button
													type="button"
													variant="text"
													onClick={() => removeFromCartHandler(item.id)}
													sx={{ color: "black" }}
												>
													<i className="fas fa-trash"></i>
												</Button>
											</Grid>
										</Grid>
									</ListItem>
									<Divider />
								</React.Fragment>
							);
						})}
					</List>
				)}
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
};

export default Cart;
