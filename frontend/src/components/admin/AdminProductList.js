import React, { useEffect } from "react";
import { Link, useNavigate, resolvePath, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listProducts, deleteProduct, createProduct } from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConst";

import AlertMessage from "../Interface/AlertMessage";
import Loader from "../Interface/Loader";
import Paginate from "../Interface/Paginate";
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
	const params = useParams();

	const { products, loading, error, page, pages } = useSelector((state) => {
		return state.productList;
	});

	const {
		success: successRemove,
		loading: loadingRemove,
		error: errorRemove,
	} = useSelector((state) => {
		return state.adminProductRemove;
	});

	const {
		success: successCreate,
		loading: loadingCreate,
		error: errorCreate,
		product: createdProduct,
	} = useSelector((state) => {
		return state.adminProductCreate;
	});

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts("", params.pageNumber ?? 1));
		} else {
			navigate(resolvePath("/login"), { replace: true });
		}

		if (successCreate) {
			navigate(resolvePath(`/admin/product/${createdProduct._id}/edit`));
		} else {
			dispatch(listProducts("", params.pageNumber ?? 1));
		}
	}, [dispatch, navigate, userInfo, successRemove, successCreate, createdProduct, params]);

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	const deleteProductHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteProduct(id));
		}
	};

	return (
		<React.Fragment>
			<Grid
				container
				className="algin-items-center"
				justifyContent="space-between"
				sx={{ mt: 2 }}
			>
				<Grid item>
					<h1 className="mt-2">Products</h1>
				</Grid>
				<Grid item className="text-right">
					<Button className="my-2" size="large" onClick={createProductHandler}>
						<i className="fas fa-plus" />
						&nbsp;Create Product
					</Button>
				</Grid>
			</Grid>
			{loadingCreate && <Loader />}
			{errorCreate && <AlertMessage variant="error">{errorCreate}</AlertMessage>}
			{loadingRemove && <Loader />}
			{errorRemove && <AlertMessage variant="error">{errorRemove}</AlertMessage>}
			{loading ? (
				<Loader />
			) : error ? (
				<AlertMessage variant="error">{error}</AlertMessage>
			) : (
				products && (
					<React.Fragment>
						<TableContainer component={Paper} sx={{ mt: 3 }}>
							<Table sx={{ minWidth: 700 }} aria-label="customized table">
								<TableHead>
									<TableRow>
										<CustomTableCell align="center">ID</CustomTableCell>
										<CustomTableCell align="left">NAME</CustomTableCell>
										<CustomTableCell align="left">PRICE</CustomTableCell>
										<CustomTableCell align="left">CATEGORY</CustomTableCell>
										<CustomTableCell align="left">BRAND</CustomTableCell>
										<CustomTableCell align="center"></CustomTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{products.map((product) => (
										<CustomTableRow key={product._id}>
											<CustomTableCell component="th" scope="product">
												{product._id}
											</CustomTableCell>
											<CustomTableCell align="left">
												{product.name}
											</CustomTableCell>
											<CustomTableCell align="left">
												${product.price}
											</CustomTableCell>
											<CustomTableCell align="left">
												{product.category}
											</CustomTableCell>
											<CustomTableCell align="left">
												{product.brand}
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
														to={`/admin/product/${product._id}/edit`}
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
														onClick={() => {
															deleteProductHandler(product._id);
														}}
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
						<Paginate page={page} pages={pages} isAdmin={userInfo.isAdmin} />
					</React.Fragment>
				)
			)}
		</React.Fragment>
	);
};

export default UserList;
