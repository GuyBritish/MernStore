import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "./components/cart/Cart";
import LoginForm from "./components/users/LoginForm";
import RegisterForm from "./components/users/RegisterForm";

import { Container } from "@mui/material";
import Profile from "./components/users/Profile";
import Shipping from "./components/cart/Shipping";
import Payment from "./components/cart/Payment";
import Order from "./components/cart/Order";
import OrderDetails from "./components/cart/OrderDetails";

import AdminUserList from "./components/admin/AdminUserList";
import AdminUserEdit from "./components/admin/AdminUserEdit";
import AdminProductList from "./components/admin/AdminProductList";
import AdminProductEdit from "./components/admin/AdminProductEdit";
import AdminOrderList from "./components/admin/AdminOrderList";

function App() {
	return (
		<React.Fragment>
			<Header />
			<main className="py-3 px-0">
				<Container maxWidth="lg">
					<Routes>
						<Route path="/" element={<ProductList />} />
						<Route path="/products/:id" element={<ProductDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/cart/:id" element={<Cart />} />

						<Route path="/login" element={<LoginForm />} />
						<Route path="/register" element={<RegisterForm />} />
						<Route path="/profile" element={<Profile />} />

						<Route path="/shipping" element={<Shipping />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/order" element={<Order />} />
						<Route path="/order/:id" element={<OrderDetails />} />

						<Route path="/admin/userlist" element={<AdminUserList />} />
						<Route path="/admin/user/:id/edit" element={<AdminUserEdit />} />
						<Route path="/admin/productlist" element={<AdminProductList />} />
						<Route
							path="/admin/productlist/page/:pageNumber"
							element={<AdminProductList />}
						/>
						<Route path="/admin/product/:id/edit" element={<AdminProductEdit />} />
						<Route path="/admin/orderlist" element={<AdminOrderList />} />

						<Route path="/search/:keyword" element={<ProductList />} />
						<Route path="/page/:pageNumber" element={<ProductList />} />
						<Route path="/search/:keyword/page/:pageNumber" element={<ProductList />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
