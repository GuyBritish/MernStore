import axios from "axios";

import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_REMOVE_REQUEST,
	USER_REMOVE_SUCCESS,
	USER_REMOVE_FAIL,
	USER_EDIT_REQUEST,
	USER_EDIT_SUCCESS,
	USER_EDIT_FAIL,
	USER_EDIT_RESET,
} from "../constants/userConst";

import { ORDER_USER_LIST_RESET } from "../constants/orderConst";

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });

			const options = {
				url: "/api/users/login",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					email,
					password,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: resp.data,
			});

			localStorage.setItem("userInfo", JSON.stringify(resp.data));
		} catch (err) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const register = (name, email, password) => {
	return async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const options = {
				url: "/api/users",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					name,
					email,
					password,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: resp.data,
			});

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: resp.data,
			});

			localStorage.setItem("userInfo", JSON.stringify(resp.data));
		} catch (err) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const logout = () => {
	return (dispatch) => {
		localStorage.removeItem("userInfo");
		dispatch({ type: USER_LOGOUT });
		dispatch({ type: USER_DETAILS_RESET });
		dispatch({ type: ORDER_USER_LIST_RESET });
		dispatch({ type: USER_LIST_RESET });
		dispatch({ type: USER_EDIT_RESET });
	};
};

export const getUser = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: USER_DETAILS_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: USER_DETAILS_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const updateProfile = (user) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: USER_UPDATE_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: "/api/users/profile",
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
				data: {
					_id: user.id,
					name: user.name,
					email: user.email,
					password: user.password,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: USER_UPDATE_SUCCESS,
				payload: resp.data,
			});

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: resp.data,
			});
			localStorage.setItem("userInfo", JSON.stringify(resp.data));
		} catch (err) {
			dispatch({
				type: USER_UPDATE_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const listUsers = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: USER_LIST_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: "/api/users",
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const resp = await axios(options);

			dispatch({
				type: USER_LIST_SUCCESS,
				payload: resp.data,
			});
		} catch (err) {
			dispatch({
				type: USER_LIST_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const removeUser = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: USER_REMOVE_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/users/${id}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios(options);

			dispatch({ type: USER_REMOVE_SUCCESS });
		} catch (err) {
			dispatch({
				type: USER_REMOVE_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const editUser = (user) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: USER_EDIT_REQUEST });

			const {
				userAuth: { userInfo },
			} = getState();

			const options = {
				url: `/api/users/${user._id}`,
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
				data: {
					_id: user.id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				},
			};

			const resp = await axios(options);

			dispatch({ type: USER_EDIT_SUCCESS });
			dispatch({ type: USER_DETAILS_SUCCESS, payload: resp.data });
		} catch (err) {
			dispatch({
				type: USER_EDIT_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};
