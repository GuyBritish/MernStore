const bcrypt = require("bcryptjs");

const users = [
	{
		name: "Guy British",
		email: "chadmin@progamer.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "weak1@noobgamer.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: false,
	},
	{
		name: "Jane Doe",
		email: "weak2@noobgamer.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
];
