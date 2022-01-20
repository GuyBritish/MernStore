import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConst";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			const itemInCart = state.cartItems.find((x) => {
				return x.product === item.product;
			});

			if (itemInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => {
						return x.product === itemInCart.product ? item : x;
					}),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			return state;
		default:
			return state;
	}
};
