import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConst";

export const addToCart = (id, qty) => {
	return async (dispatch, getState) => {
		const options = {
			url: `/api/products/${id}`,
		};
		const resp = await axios(options);

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				id: resp.data._id,
				name: resp.data.name,
				image: resp.data.image,
				price: resp.data.price,
				countInStock: resp.data.countInStock,
				qty,
			},
		});

		localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
	};
};

export const removeFromCart = (id) => {
	return async (dispatch, getState) => {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: id,
		});

		localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
	};
};
