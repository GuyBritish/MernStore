import React from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { Container } from "@mui/material";

function App() {
	return (
		<React.Fragment>
			<Header />
			<main className="py-3">
				<Container>
					<h1>Welcome to Mern Store</h1>
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
