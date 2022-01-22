import React from "react";

import { Container, Grid } from "@mui/material";

const FormContainer = (props) => {
	return (
		<Container>
			<Grid container className="justify-content-md-center">
				<Grid item xs={12} md={6}>
					{props.children}
				</Grid>
			</Grid>
		</Container>
	);
};

export default FormContainer;
