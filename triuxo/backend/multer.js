const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { configDotenv } = require("dotenv");
configDotenv();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Multer with Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Blogs",
  },
});

// Initialize multer with the storage and file filter options
const upload = multer({
  storage,
});

module.exports = upload;
