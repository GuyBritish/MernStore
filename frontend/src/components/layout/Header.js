import React from "react";

import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Box,
	Button,
	createTheme,
	ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const Header = () => {
	return (
		<header>
			<ThemeProvider theme={darkTheme}>
				<AppBar position="static" elevation={0}>
					<Container>
						<Toolbar disableGutters sx={{ p: "1rem" }}>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
							>
								LOGO
							</Typography>

							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
							>
								LOGO
							</Typography>
							<Box
								sx={{
									flexGrow: 0,
									display: { xs: "none", md: "flex" },
									ml: "auto",
								}}
							>
								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<i className="fas fa-shopping-cart" /> Cart
								</Button>
								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<i className="fas fa-user" /> Sign In
								</Button>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</ThemeProvider>
		</header>
	);
};

export default Header;
