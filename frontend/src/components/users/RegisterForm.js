import React, { useState, useEffect } from "react";
import { Link, resolvePath, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/userActions";

import FormContainer from "../Interface/FormContainer";
import AlertMessage from "../Interface/AlertMessage";
import Loader from "../Interface/Loader";
import { Button, FormGroup, Grid, FilledInput, InputLabel } from "@mui/material";

const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [query] = useSearchParams();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const { loading, error, userInfo } = useSelector((state) => {
		return state.userRegister;
	});

	let redirect = query.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(resolvePath(redirect), { replace: true });
		}
	}, [navigate, userInfo, redirect]);

	const registerHandler = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <AlertMessage variant="error">{message}</AlertMessage>}
			{error && <AlertMessage variant="error">{error}</AlertMessage>}
			{loading && <Loader />}
			<form onSubmit={registerHandler} className="mt-3">
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
					Sign Up
				</Button>
			</form>

			<Grid container className="py-3">
				<Grid item>
					Already have and account?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
				</Grid>
			</Grid>
		</FormContainer>
	);
};

export default RegisterForm;
