import React from "react";

import { Container, Grid } from "@mui/material";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Grid container justifyContent="center" pt={3}>
					<Grid item>Copyright &copy; Mern Store</Grid>
				</Grid>
			</Container>
		</footer>
	);
};

export default Footer;
