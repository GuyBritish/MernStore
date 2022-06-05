import axios from "axios";

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_REVIEW_REQUEST,
	PRODUCT_REVIEW_SUCCESS,
	PRODUCT_REVIEW_FAIL,
} from "../constants/productConst";

export const listProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LIST_REQUEST });

			const options = {
				url: "/api/products",
			};
			const resp = await axios(options);

			dispatch({ type: PRODUCT_LIST_SUCCESS, payload: resp.data });
		} catch (err) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const listProductDetails = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_DETAILS_REQUEST });

			const options = {
				url: `/api/products/${id}`,
			};
			const resp = await axios(options);

			dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: resp.data });
		} catch (err) {
			dispatch({
				type: PRODUCT_DETAILS_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_DELETE_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/products/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios(options);

			dispatch({ type: PRODUCT_DELETE_SUCCESS });
		} catch (err) {
			dispatch({
				type: PRODUCT_DELETE_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const createProduct = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_CREATE_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/products`,
				method: "POST",
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const resp = await axios(options);

			dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: resp.data });
		} catch (err) {
			dispatch({
				type: PRODUCT_CREATE_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const editProduct = (product) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_EDIT_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const dataUpload = new FormData();
			dataUpload.append("name", product.name);
			dataUpload.append("price", product.price);
			dataUpload.append("brand", product.brand);
			dataUpload.append("category", product.category);
			dataUpload.append("countInStock", product.countInStock);
			dataUpload.append("description", product.description);
			dataUpload.append("image", product.image);

			const options = {
				url: `/api/products/${product._id}`,
				method: "PUT",
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${userInfo.token}`,
				},
				data: dataUpload,
			};

			const resp = await axios(options);

			dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: resp.data });
		} catch (err) {
			dispatch({
				type: PRODUCT_EDIT_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const reviewProduct = (productId, review) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_REVIEW_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/products/${productId}/reviews`,
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${userInfo.token}`,
				},
				data: review,
			};

			await axios(options);

			dispatch({ type: PRODUCT_REVIEW_SUCCESS });
		} catch (err) {
			dispatch({
				type: PRODUCT_REVIEW_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};
