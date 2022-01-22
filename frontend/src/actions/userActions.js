import axios from "axios";

import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConst";

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

			localStorage.setItem("userInfo", JSON.stringify(resp.datas));
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
