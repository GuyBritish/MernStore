import React, { useState, useEffect } from "react";
import { Link, resolvePath, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/userActions";

import FormContainer from "../UI/FormContainer";
import AlertMessage from "../UI/AlertMessage";
import Loader from "../UI/Loader";
import { Button, FormGroup, Grid, FilledInput, InputLabel } from "@mui/material";

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [query] = useSearchParams();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, error, userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	let redirect = query.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(resolvePath(redirect), { replace: true });
		}
	}, [navigate, userInfo, redirect]);

	const loginHandler = (event) => {
		event.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <AlertMessage variant="error">{error}</AlertMessage>}
			{loading && <Loader />}
			<form onSubmit={loginHandler} className="mt-3">
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
				<FormGroup className="my-2">
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
					Sign In
				</Button>
			</form>

			<Grid container className="py-3">
				<Grid item>
					New customer?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Register
					</Link>
				</Grid>
			</Grid>
		</FormContainer>
	);
};

export default LoginForm;
