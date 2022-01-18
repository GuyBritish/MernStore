import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from "../constants/productConst";

export const productListReducer = (state = { products: [], loading: false }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { products: [], loading: true };
		case PRODUCT_LIST_SUCCESS:
			return { products: action.payload, loading: false };
		case PRODUCT_LIST_FAIL:
			return { loading: false, errpr: action.payload };
		default:
			return;
	}
};
