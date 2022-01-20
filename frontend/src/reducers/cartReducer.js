import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConst";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			const itemInCart = state.cartItems.find((x) => {
				return x.id === item.id;
			});

			if (itemInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => {
						return x.id === itemInCart.id ? item : x;
					}),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => {
					return x.id !== action.payload;
				}),
			};
		default:
			return state;
	}
};
