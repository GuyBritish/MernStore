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
import { Link, NavLink } from "react-router-dom";

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
								to="/"
								sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
							>
								<Link
									to="/"
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									MERN STORE
								</Link>
							</Typography>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
							>
								<Link
									to="/"
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									MERN STORE
								</Link>
							</Typography>
							<Box
								sx={{
									flexGrow: 0,
									display: { xs: "none", md: "flex" },
									ml: "auto",
								}}
							>
								<NavLink
									to="/cart"
									className={(nav) =>
										nav.isActive ? "navlink linkActive" : "navlink"
									}
								>
									<Button sx={{ my: 2, color: "inherit", display: "block" }}>
										<i className="fas fa-shopping-cart" /> Cart
									</Button>
								</NavLink>
								<NavLink
									to="/login"
									className={(nav) =>
										nav.isActive ? "navlink linkActive" : "navlink"
									}
								>
									<Button sx={{ my: 2, color: "inherit", display: "block" }}>
										<i className="fas fa-user" /> Sign In
									</Button>
								</NavLink>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</ThemeProvider>
		</header>
	);
};

export default Header;
