import React, { useEffect } from "react";
import { Link, useNavigate, resolvePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listOrders } from "../../actions/orderActions";

import AlertMessage from "../Interface/AlertMessage";
import Loader from "../Interface/Loader";
import CustomTableRow from "../Interface/CustomTableRow";
import CustomTableCell from "../Interface/CustomTableCell";
import {
	Button,
	Grid,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	Table,
	Paper,
} from "@mui/material";

const AdminOrderList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { orderList, loading, error } = useSelector((state) => {
		return state.adminOrderList;
	});

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			navigate(resolvePath("/login"), { replace: true });
		}
	}, [dispatch, navigate, userInfo]);

	return (
		<React.Fragment>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<AlertMessage variant="error">{error}</AlertMessage>
			) : (
				orderList && (
					<TableContainer component={Paper} sx={{ mt: 3 }}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<CustomTableCell align="center">ID</CustomTableCell>
									<CustomTableCell align="left">USER</CustomTableCell>
									<CustomTableCell align="left">DATE</CustomTableCell>
									<CustomTableCell align="left">TOTAL</CustomTableCell>
									<CustomTableCell align="left">PAID</CustomTableCell>
									<CustomTableCell align="left">DELIVERED</CustomTableCell>
									<CustomTableCell align="center"></CustomTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orderList.map((order) => (
									<CustomTableRow key={order._id}>
										<CustomTableCell component="th" scope="user">
											{order._id}
										</CustomTableCell>
										<CustomTableCell align="left">
											{order.user && order.user.name}
										</CustomTableCell>
										<CustomTableCell align="left">
											{order.createdAt.substring(0, 10)}
										</CustomTableCell>
										<CustomTableCell align="left">
											${order.totalPrice}
										</CustomTableCell>
										<CustomTableCell align="left">
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												/>
											)}
										</CustomTableCell>
										<CustomTableCell align="left">
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
													to={`/order/${order._id}`}
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
		</React.Fragment>
	);
};

export default AdminOrderList;
