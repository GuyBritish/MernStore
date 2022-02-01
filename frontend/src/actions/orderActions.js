import axios from "axios";

import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
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
				url: "/api/orders",
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

export const getOrderDetails = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_DETAILS_REQUEST,
			});

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/orders/${id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: ORDER_DETAILS_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: ORDER_DETAILS_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};
