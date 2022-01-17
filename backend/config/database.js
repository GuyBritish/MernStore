const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const databaseURI = process.env.MONGODB_URI || "mongodb://localhost:27017/MernStore";
		const connect = await mongoose.connect(databaseURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 10000,
		});
		console.log("Connected to database");
	} catch (err) {
		console.log(err.message);
		console.log("Database connection error");
		process.exit(1);
	}
};

module.exports = connectDB;
