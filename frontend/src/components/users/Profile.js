import React, { useState, useEffect } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateProfile } from "../../actions/userActions";

import AlertMessage from "../UI/AlertMessage";
import Loader from "../UI/Loader";
import { Button, FormGroup, Grid, FilledInput, InputLabel } from "@mui/material";

import { USER_UPDATE_RESET } from "../../constants/userConst";

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

	useEffect(() => {
		if (!userInfo) {
			navigate(resolvePath("/login"), { replace: true });
		} else {
			if (!user.name) {
				dispatch(getUser("profile"));
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
		<Grid container>
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
			</Grid>
		</Grid>
	);
};

export default Profile;
