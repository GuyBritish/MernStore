import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/userActions";

import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Box,
	Button,
	createTheme,
	ThemeProvider,
	Menu,
	MenuItem,
} from "@mui/material";
import { Link, NavLink, resolvePath, useNavigate } from "react-router-dom";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const { userInfo } = useSelector((state) => {
		return state.userAuth;
	});

	const handleOpenUserMenu = (event) => {
		event.preventDefault();
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleProfileMenu = () => {
		handleCloseUserMenu();
		navigate(resolvePath("/users/profile"));
	};

	const handleLogoutMenu = () => {
		handleCloseUserMenu();
		dispatch(logout());
		navigate(resolvePath("/"), { replace: true });
	};

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
								{userInfo ? (
									<React.Fragment>
										<NavLink
											to="/users/profile"
											className={(nav) =>
												nav.isActive ? "navlink linkActive" : "navlink"
											}
										>
											<Button
												sx={{ my: 2, color: "inherit", display: "block" }}
												onClick={handleOpenUserMenu}
											>
												<i className="fas fa-user" /> {userInfo.name}
											</Button>
										</NavLink>
										<Menu
											sx={{ mt: "45px" }}
											id="menu-appbar"
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											<MenuItem key="profile" onClick={handleProfileMenu}>
												<Typography textAlign="center">Profile</Typography>
											</MenuItem>
											<MenuItem key="logout" onClick={handleLogoutMenu}>
												<Typography textAlign="center">Logout</Typography>
											</MenuItem>
										</Menu>
									</React.Fragment>
								) : (
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
								)}
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</ThemeProvider>
		</header>
	);
};

export default Header;
