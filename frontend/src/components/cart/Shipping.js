import React, { useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { saveShippingInfo } from "../../actions/cartActions";

import FormContainer from "../UI/FormContainer";

import { FormGroup, InputLabel, FilledInput, Button } from "@mui/material";

const Shipping = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { shippingAddress } = useSelector((state) => {
		return state.cart;
	});

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(
			saveShippingInfo({
				address,
				city,
				postalCode,
				country,
			})
		);
		navigate(resolvePath("/payment"));
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<form onSubmit={submitHandler} className="mt-3">
				<FormGroup className="my-3">
					<InputLabel className="mb-2">
						<strong>Address</strong>
					</InputLabel>
					<FilledInput
						type="text"
						id="address"
						size="small"
						hiddenLabel
						disableUnderline
						required
						value={address}
						placeholder="Enter shipping address"
						onChange={(event) => {
							setAddress(event.target.value);
						}}
					/>
				</FormGroup>

				<FormGroup className="my-3">
					<InputLabel className="mb-2">
						<strong>City</strong>
					</InputLabel>
					<FilledInput
						type="text"
						id="city"
						size="small"
						hiddenLabel
						disableUnderline
						required
						value={city}
						placeholder="Enter city"
						onChange={(event) => {
							setCity(event.target.value);
						}}
					/>
				</FormGroup>

				<FormGroup className="my-3">
					<InputLabel className="mb-2">
						<strong>Postal Code</strong>
					</InputLabel>
					<FilledInput
						type="text"
						id="postalCode"
						size="small"
						hiddenLabel
						disableUnderline
						required
						value={postalCode}
						placeholder="Enter postal code"
						onChange={(event) => {
							setPostalCode(event.target.value);
						}}
					/>
				</FormGroup>

				<FormGroup className="my-3">
					<InputLabel className="mb-2">
						<strong>Country</strong>
					</InputLabel>
					<FilledInput
						type="text"
						id="country"
						size="small"
						hiddenLabel
						disableUnderline
						required
						value={country}
						placeholder="Enter country"
						onChange={(event) => {
							setCountry(event.target.value);
						}}
					/>
				</FormGroup>

				<Button
					type="submit"
					sx={{
						flexGrow: 1,
						mt: 3,
						display: "block",
						color: "inherit",
						backgroundColor: "inherit",
					}}
					size="large"
					className="darkButton"
					variant="contained"
					disableElevation
				>
					Continue
				</Button>
			</form>
		</FormContainer>
	);
};

export default Shipping;
