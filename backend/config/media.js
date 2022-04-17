const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

/* -------------------------------------------------------------------------- */
console.log(process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
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
