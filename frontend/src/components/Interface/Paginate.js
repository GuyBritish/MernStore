import React from "react";
import { useNavigate, resolvePath } from "react-router-dom";

import { Pagination } from "@mui/material";

const Paginate = (props) => {
	const navigate = useNavigate();

	const { pages, page, isAdmin = false, keyword = "" } = props;

	const changePageHandler = (event, page) => {
		if (isAdmin) {
			navigate(resolvePath(`/admin/productlist/page/${page}`));
		} else {
			navigate(resolvePath(`/${keyword ? `search/${keyword}/` : ""}page/${page}`));
		}
	};

	return (
		pages > 1 && (
			<Pagination
				count={pages}
				page={page}
				variant="outlined"
				shape="rounded"
				onChange={changePageHandler}
			/>
		)
	);
};

export default Paginate;
