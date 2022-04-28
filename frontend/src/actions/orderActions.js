import axios from "axios";

import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_SUCCESS,
	ORDER_USER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
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

export const payOrder = (id, paymentResult) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_PAY_REQUEST,
			});

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/orders/${id}/pay`,
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
				data: paymentResult,
			};

			const resp = await axios(options);

			dispatch({
				type: ORDER_PAY_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const listMyOrders = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_LIST_REQUEST,
			});

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/orders`,
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: ORDER_LIST_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: ORDER_LIST_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const listOrders = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_USER_LIST_REQUEST,
			});

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/orders/myorders`,
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: ORDER_USER_LIST_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: ORDER_USER_LIST_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};
