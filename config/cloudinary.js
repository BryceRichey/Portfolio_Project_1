require('dotenv').config();

let cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


class CloudinaryAPI {
    constructor(cloud_name, api_key, api_secret) {
        if (cloud_name && api_key && api_secret) {
            this.useCloudinary = true;
            this.initCloudinary(cloud_name, api_key, api_secret);
        } else {
            this.useCloudinary = false;
            const storage = multer.memoryStorage();
            this.multer = multer({ storage });
        }
    }

    initCloudinary(cloud_name, api_key, api_secret) {
        cloudinary.config({
            cloud_name,
            api_key,
            api_secret,
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

        this.multer = multer({
            storage: storage,
            dest: './public/data/uploads/',
            fileFilter: fileFilter,
            limits: limits
        });

        this.uploader = cloudinary.uploader;
    }

    create() {
        return this.multer.single('uploaded_file');
    }

    destroy(publicId) {
        if (this.useCloudinary) {
            return this.uploader.destroy(publicId);
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    }
}

module.exports = new CloudinaryAPI(
    process.env.CLOUDINARY_CLOUD_NAME,
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET
);