import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<React.Fragment>
			<Header />
			<main>
				<div className="App">
					<h1>Welcome to Mern Store</h1>
				</div>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
