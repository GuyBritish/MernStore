import axios from "axios";

import { CART_ADD_ITEM } from "../constants/cartConst";

export const addToCart = (id, qty) => {
	return async (dispatch, getState) => {
		const options = {
			url: `/api/products/${id}`,
		};
		const resp = await axios(options);

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: resp.data._id,
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
