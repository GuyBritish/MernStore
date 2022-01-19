import axios from "axios";

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
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
