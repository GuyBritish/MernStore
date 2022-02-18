import React from "react";

import { TableRow, styled } from "@mui/material";

const CustomTableRow = (props) => {
	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}));
	return <StyledTableRow>{props.children}</StyledTableRow>;
};

export default CustomTableRow;
