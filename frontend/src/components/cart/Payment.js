import React, { useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../../actions/cartActions";

import FormContainer from "../UI/FormContainer";

import { InputLabel, RadioGroup, Radio, FormControlLabel, Button } from "@mui/material";

const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { shippingAddress } = useSelector((state) => {
		return state.cart;
	});

	if (!shippingAddress) {
		navigate(resolvePath("/shipping"));
	}

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const changeHandler = (event) => {
		setPaymentMethod(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate(resolvePath("/order"));
	};

	return (
		<FormContainer>
			<h1>Payment Method</h1>
			<form onSubmit={submitHandler} className="mt-3">
				<RadioGroup className="my-4" value={paymentMethod} onChange={changeHandler}>
					<InputLabel className="mb-2">
						<h5>Select Method</h5>
					</InputLabel>
					<FormControlLabel
						value="PayPal"
						control={<Radio />}
						label="PayPal or credit card"
					/>
					<FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
				</RadioGroup>
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

export default Payment;
