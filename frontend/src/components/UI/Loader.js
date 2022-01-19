import React from "react";

import { CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<React.Fragment>
			<CircularProgress sx={{ width: 100, height: 100, margin: "auto", display: "block" }} />;
			<span className="sr-only">Loading...</span>
		</React.Fragment>
	);
};

export default Loader;
