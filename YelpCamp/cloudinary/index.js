// cloudinary/index.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Make sure this is correct
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp', // The folder name in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg'], // Specify allowed formats
    },
});

module.exports = { cloudinary, storage };

