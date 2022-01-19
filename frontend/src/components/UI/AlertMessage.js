import React from "react";

import { Alert } from "@mui/material";

const AlertMessage = (props) => {
	return <Alert severity={props.variant || "info"}>{props.children}</Alert>;
};

export default AlertMessage;
