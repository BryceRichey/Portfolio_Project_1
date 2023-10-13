require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'recipe_images'
    }
});

function fileFilter(_req, file, cb) {
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (validTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const limits = {
    fileSize: 1048576,
    files: 1
}

const upload = multer({
    storage: storage,
    dest: './public/data/uploads/',
    fileFilter: fileFilter,
    limits: limits
});

const uploader = cloudinary.uploader

module.exports = {
    cloudinary,
    storage,
    upload,
    uploader
}