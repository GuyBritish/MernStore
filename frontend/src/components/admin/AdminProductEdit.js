import React, { useState, useEffect } from "react";
import { Link, resolvePath, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails, editProduct } from "../../actions/productActions";
import { PRODUCT_EDIT_RESET } from "../../constants/productConst";

import FormContainer from "../Interface/FormContainer";
import AlertMessage from "../Interface/AlertMessage";
import Loader from "../Interface/Loader";
import { Button, FormGroup, FilledInput, InputLabel } from "@mui/material";

const AdminProductEdit = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const { loading, error, product } = useSelector((state) => {
		return state.productDetails;
	});

	const {
		loading: loadingEdit,
		error: errorEdit,
		success: successEdit,
	} = useSelector((state) => {
		return state.adminProductEdit;
	});

	useEffect(() => {
		if (successEdit) {
			dispatch({ type: PRODUCT_EDIT_RESET });
			navigate(resolvePath("/admin/productlist"), { replace: true });
		} else {
			if (!product || !product.name || product._id !== params.id) {
				dispatch(listProductDetails(params.id));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [product, dispatch, params, navigate, successEdit]);

	const editHandler = (event) => {
		event.preventDefault();
		dispatch(
			editProduct({
				_id: params.id,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	return (
		<React.Fragment>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
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
									<strong>Price</strong>
								</InputLabel>
								<FilledInput
									type="number"
									id="price"
									size="small"
									hiddenLabel
									disableUnderline
									value={price}
									placeholder="Enter price"
									onChange={(event) => {
										setPrice(event.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup className="my-3">
								<InputLabel className="mb-2">
									<strong>Image</strong>
								</InputLabel>
								<FilledInput
									type="text"
									id="image"
									size="small"
									hiddenLabel
									disableUnderline
									value={image}
									placeholder="Enter image url"
									onChange={(event) => {
										setImage(event.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup className="my-3">
								<InputLabel className="mb-2">
									<strong>Brand</strong>
								</InputLabel>
								<FilledInput
									type="text"
									id="brand"
									size="small"
									hiddenLabel
									disableUnderline
									value={brand}
									placeholder="Enter brand"
									onChange={(event) => {
										setBrand(event.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup className="my-3">
								<InputLabel className="mb-2">
									<strong>Category</strong>
								</InputLabel>
								<FilledInput
									type="text"
									id="category"
									size="small"
									hiddenLabel
									disableUnderline
									value={category}
									placeholder="Enter brand"
									onChange={(event) => {
										setCategory(event.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup className="my-3">
								<InputLabel className="mb-2">
									<strong>Count In Stock</strong>
								</InputLabel>
								<FilledInput
									type="number"
									id="countInStock"
									size="small"
									hiddenLabel
									disableUnderline
									value={countInStock}
									placeholder="Enter count in stock"
									onChange={(event) => {
										setCountInStock(event.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup className="my-3">
								<InputLabel className="mb-2">
									<strong>Description</strong>
								</InputLabel>
								<FilledInput
									type="text"
									id="description"
									size="small"
									hiddenLabel
									disableUnderline
									value={description}
									placeholder="Enter image url"
									onChange={(event) => {
										setDescription(event.target.value);
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
								Submit
							</Button>
						</form>
					</React.Fragment>
				)}
			</FormContainer>
		</React.Fragment>
	);
};

export default AdminProductEdit;
