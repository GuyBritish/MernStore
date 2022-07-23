import jwt_decode from "jwt-decode";

export const getUserInfo = () => {
	let userInfo = localStorage.getItem("userInfo");
	if (userInfo) {
		const user = JSON.parse(userInfo);
		const token = jwt_decode(user.token);
		return !token || Date.now() >= token.exp * 1000 ? null : user;
	}
	return null;
};
