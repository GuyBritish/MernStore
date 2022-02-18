import React, { useState, useEffect } from "react";
import { Link, resolvePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateProfile } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";
import { USER_UPDATE_RESET } from "../../constants/userConst";

import AlertMessage from "../Interface/AlertMessage";
import Loader from "../Interface/Loader";
import CustomTableRow from "../Interface/CustomTableRow";
import CustomTableCell from "../Interface/CustomTableCell";
import {
	Button,
	FormGroup,
	Grid,
	FilledInput,
	InputLabel,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	Table,
	Paper,
} from "@mui/material";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const { loading, error, user } = useSelector((state) => {
		return state.userDetails;
	});

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	const { success } = useSelector((state) => {
		return state.userUpdate;
	});

	const {
		orderList,
		loading: loadingOrders,
		error: errorOrders,
	} = useSelector((state) => {
		return state.orderUserList;
	});

	useEffect(() => {
		if (!userInfo) {
			navigate(resolvePath("/login"), { replace: true });
		} else {
			if (!user.name) {
				dispatch(getUser("profile"));
				dispatch(listMyOrders());
			} else {
				dispatch({ type: USER_UPDATE_RESET });
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [navigate, userInfo, dispatch, user]);

	const updateProfileHandler = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(
				updateProfile({
					id: user._id,
					name,
					email,
					password,
				})
			);
		}
	};

	return (
		<Grid container sx={{ mt: 3 }}>
			<Grid item md={3}>
				<h2>User Profile</h2>
				{message && <AlertMessage variant="error">{message}</AlertMessage>}
				{error && <AlertMessage variant="error">{error}</AlertMessage>}
				{success && (
					<AlertMessage variant="success">Profile successfully updated</AlertMessage>
				)}
				{loading && <Loader />}
				<form onSubmit={updateProfileHandler} className="mt-3">
					<FormGroup className="my-3">
						<InputLabel className="mb-2">
							<strong>Name</strong>
						</InputLabel>
						<FilledInput
							type="text"
							id="name"
							size="small"
							hiddenLabel
							disableUnderline
							value={name}
							placeholder="Enter your name"
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</FormGroup>
					<FormGroup className="my-3">
						<InputLabel className="mb-2">
							<strong>Email Address</strong>
						</InputLabel>
						<FilledInput
							type="email"
							id="email"
							size="small"
							hiddenLabel
							disableUnderline
							value={email}
							placeholder="Enter email"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</FormGroup>
					<FormGroup className="my-3">
						<InputLabel className="mb-2">
							<strong>Password</strong>
						</InputLabel>
						<FilledInput
							type="password"
							id="password"
							size="small"
							hiddenLabel
							disableUnderline
							value={password}
							placeholder="Enter password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</FormGroup>
					<FormGroup className="my-3">
						<InputLabel className="mb-2">
							<strong>Confirm Password</strong>
						</InputLabel>
						<FilledInput
							type="password"
							id="passwordConfirm"
							size="small"
							hiddenLabel
							disableUnderline
							value={confirmPassword}
							placeholder="Confirm password"
							onChange={(event) => {
								setConfirmPassword(event.target.value);
							}}
						/>
					</FormGroup>
					<Button
						type="submit"
						sx={{
							flexGrow: 1,
							mt: 2,
							display: "block",
							color: "inherit",
							backgroundColor: "inherit",
						}}
						size="large"
						className="darkButton"
						variant="contained"
						disableElevation
					>
						Update
					</Button>
				</form>
			</Grid>
			<Grid item md={9} pl={4}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<AlertMessage variant="error">{errorOrders}</AlertMessage>
				) : (
					orderList && (
						<TableContainer component={Paper} sx={{ mt: 3 }}>
							<Table sx={{ minWidth: 700 }} aria-label="customized table">
								<TableHead>
									<TableRow>
										<CustomTableCell align="center">ID</CustomTableCell>
										<CustomTableCell align="center">DATE</CustomTableCell>
										<CustomTableCell align="center">TOTAL</CustomTableCell>
										<CustomTableCell align="center">PAID</CustomTableCell>
										<CustomTableCell align="center">DELIVERED</CustomTableCell>
										<CustomTableCell align="center"></CustomTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orderList.map((order) => (
										<CustomTableRow key={order._id}>
											<CustomTableCell component="th" scope="order">
												{order._id}
											</CustomTableCell>
											<CustomTableCell align="center">
												{order.createdAt.substring(0, 10)}
											</CustomTableCell>
											<CustomTableCell align="right">
												{order.totalPrice.toFixed(2)}
											</CustomTableCell>
											<CustomTableCell align="center">
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<i
														className="fas fa-times"
														style={{ color: "red" }}
													/>
												)}
											</CustomTableCell>
											<CustomTableCell align="center">
												{order.isDelivered ? (
													order.deliveredAt.substring(0, 10)
												) : (
													<i
														className="fas fa-times"
														style={{ color: "red" }}
													/>
												)}
											</CustomTableCell>
											<CustomTableCell align="center">
												<Grid container justifyContent="center">
													<Button
														sx={{
															flexGrow: 1,
															mx: 1,
															display: "block",
															color: "inherit",
															backgroundColor: "inherit",
															align: "center",
														}}
														className="darkButton"
														variant="contained"
														disableElevation
														component={Link}
														to={`/orders/${order._id}`}
													>
														Details
													</Button>
												</Grid>
											</CustomTableCell>
										</CustomTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)
				)}
			</Grid>
		</Grid>
	);
};

export default Profile;
