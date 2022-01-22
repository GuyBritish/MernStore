import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productDetailsReducer, productListReducer } from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import { userAuthReducer } from "../reducers/userReducer";

/* -------------------------------------------------------------------------- */

const initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
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
});

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

/* -------------------------------------------------------------------------- */

export default store;
