import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productDetailsReducer, productListReducer } from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderUserListReducer,
} from "../reducers/orderReducer";
import {
	userRegisterReducer,
	userAuthReducer,
	userDetailsReducer,
	userUpdateReducer,
	userListReducer,
} from "../reducers/userReducer";

/* -------------------------------------------------------------------------- */

const initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress"))
			: {},
		paymentMethod: localStorage.getItem("paymentMethod")
			? JSON.parse(localStorage.getItem("paymentMethod"))
			: "",
	},
	userAuth: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userAuth: userAuthReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderUserList: orderUserListReducer,
	adminUserList: userListReducer,
});

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

/* -------------------------------------------------------------------------- */

export default store;
