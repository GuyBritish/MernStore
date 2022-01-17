if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const path = require("path");

/* -------------------------------------------------------------------------- */

const connectDB = require("./config/database");
connectDB();

/* -------------------------------------------------------------------------- */

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------------------------------------- */

const productRoutes = require("./routes/product");

app.get("/", (req, res) => {
	res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.all("*", (req, res, next) => {
	res.send("404 Not Found");
});

/* -------------------------------------------------------------------------- */

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
	console.log(`Mern Store is listening on port ${Port}`);
});
