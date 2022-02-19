import React, { useEffect } from "react";
import { Link, useNavigate, resolvePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listUsers } from "../../actions/userActions";

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

const UserList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userList, loading, error } = useSelector((state) => {
		return state.adminUserList;
	});

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate(resolvePath("/login"), { replace: true });
		}
	}, [dispatch, navigate, userInfo]);

	const deleteUserHanler = () => {};

	return (
		<React.Fragment>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<AlertMessage variant="error">{error}</AlertMessage>
			) : (
				userList && (
					<TableContainer component={Paper} sx={{ mt: 3 }}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<CustomTableCell align="center">ID</CustomTableCell>
									<CustomTableCell align="left">NAME</CustomTableCell>
									<CustomTableCell align="left">EMAIL</CustomTableCell>
									<CustomTableCell align="left" sx={{ pl: 0 }}>
										ADMIN
									</CustomTableCell>
									<CustomTableCell align="center"></CustomTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userList.map((user) => (
									<CustomTableRow key={user._id}>
										<CustomTableCell component="th" scope="user">
											{user._id}
										</CustomTableCell>
										<CustomTableCell align="left">{user.name}</CustomTableCell>
										<CustomTableCell align="left">
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</CustomTableCell>
										<CustomTableCell align="left">
											{user.isAdmin ? (
												<i
													className="fas fa-check"
													style={{ color: "green" }}
												/>
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
													to={`/user/${user._id}/edit`}
												>
													<i className="fas fa-edit" />
												</Button>
												<Button
													sx={{
														flexGrow: 1,
														mx: 1,
														display: "block",
														align: "center",
													}}
													color="error"
													variant="contained"
													disableElevation
													component={Link}
													to={``}
													onClick={deleteUserHanler}
												>
													<i className="fas fa-trash" />
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

export default UserList;
