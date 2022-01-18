import axios from "axios";

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
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
