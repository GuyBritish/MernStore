const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

/* -------------------------------------------------------------------------- */

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "MernStore",
		allowedFormats: ["jpeg", "jpg", "png"],
	},
});

/* -------------------------------------------------------------------------- */

module.exports = { cloudinary, storage };
