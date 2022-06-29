import React, { useState } from "react";

import { useNavigate, resolvePath } from "react-router-dom";

import { Button, FormControl, TextField } from "@mui/material";

const SearchBox = () => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

	const searchHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(resolvePath(`/search/${keyword}`));
		} else {
			navigate(resolvePath("/"));
		}
	};

	return (
		<form onSubmit={searchHandler}>
			<FormControl sx={{ flexDirection: "row" }}>
				<TextField
					type="search"
					label={
						<React.Fragment>
							<i className="fas fa-search" /> Search Products
						</React.Fragment>
					}
					size="small"
					sx={{ mr: 2, ml: 5 }}
					placeholder="Search products"
					onChange={(e) => setKeyword(e.target.value)}
				/>

				<Button type="submit" variant="outlined" color="success" size="small">
					Search
				</Button>
			</FormControl>
		</form>
	);
};

export default SearchBox;
