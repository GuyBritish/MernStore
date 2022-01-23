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

function App() {
	return (
		<React.Fragment>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<ProductList />} />
						<Route path="/products/:id" element={<ProductDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/cart/:id" element={<Cart />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/register" element={<RegisterForm />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
