import React from "react";

import { TableCell, tableCellClasses, styled } from "@mui/material";

const CustomTableCell = (props) => {
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));
	return <StyledTableCell align={props.align}>{props.children}</StyledTableCell>;
};

export default CustomTableCell;
