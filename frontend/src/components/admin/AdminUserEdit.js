import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, resolvePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, editUser } from "../../actions/userActions";
import { USER_EDIT_RESET } from "../../constants/userConst";

import FormContainer from "../Interface/FormContainer";
import AlertMessage from "../Interface/AlertMessage";
import Loader from "../Interface/Loader";
import {
	Button,
	FormGroup,
	FilledInput,
	InputLabel,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

const AdminUserEdit = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const { loading, error, user } = useSelector((state) => {
		return state.userDetails;
	});

	const {
		loading: loadingEdit,
		error: errorEdit,
		success: successEdit,
	} = useSelector((state) => {
		return state.adminUserEdit;
	});

	useEffect(() => {
		if (successEdit) {
			dispatch({ type: USER_EDIT_RESET });
			navigate(resolvePath("/admin/userlist"), { replace: true });
		}
		if (!user || !user.name || user._id !== params.id) {
			dispatch(getUser(params.id));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, params, successEdit, navigate]);

	const editHandler = (event) => {
		event.preventDefault();
		dispatch(editUser({ _id: params.id, name, email, isAdmin }));
	};

	return (
		<React.Fragment>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingEdit && <Loader />}
				{errorEdit && <AlertMessage variant="error">{errorEdit}</AlertMessage>}
				{loading ? (
					<Loader />
				) : error ? (
					<AlertMessage variant="error">{error}</AlertMessage>
				) : (
					<React.Fragment>
						<form onSubmit={editHandler} className="mt-3">
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
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={isAdmin}
											onChange={(e) => {
												setIsAdmin(e.target.checked);
											}}
										/>
									}
									label="Is Admin"
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
								Submit
							</Button>
						</form>
					</React.Fragment>
				)}
			</FormContainer>
		</React.Fragment>
	);
};

export default AdminUserEdit;
