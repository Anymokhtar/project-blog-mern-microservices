import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const limits = {
    fileSize: {
        images: 8 * 1024 * 1024, // 8MB for image uploads
        others: 2 * 1024 * 1024, // 2MB for other requests
    },
};

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
        return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
};

const uploadPicture = multer({
    storage: storage,
    limits: { fileSize: limits.fileSize.images },
    fileFilter: fileFilter,
});

export { uploadPicture };