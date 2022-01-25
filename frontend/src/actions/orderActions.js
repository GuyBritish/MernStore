import axios from "axios";

import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
} from "../constants/orderConst";

export const createOrder = (order) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_CREATE_REQUEST,
			});

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: "/api/order",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
				data: order,
			};

			const resp = await axios(options);

			dispatch({
				type: ORDER_CREATE_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: ORDER_CREATE_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};
