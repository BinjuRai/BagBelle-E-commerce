
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

// // Storage engine
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("📂 Saving to: uploads/"); // Debug log
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const filename = `${file.fieldname}-${uuidv4()}${ext}`;
//         console.log("💾 Generated filename:", filename); // Debug log
//         cb(null, filename);
//     }
// });

// // Allow only images + videos
// const fileFilter = (req, file, cb) => {
//     console.log("🔍 File filter checking:", file.mimetype); // Debug log
//     if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image and video files are allowed"), false);
//     }
// };

// const upload = multer({
//     storage,
//     limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
//     fileFilter
// });

// module.exports = {
//     single: (fieldName) => upload.single(fieldName),
//     array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
//     fields: (fieldsArray) => upload.fields(fieldsArray),
// };
const multer = require("multer");
const crypto = require("crypto"); // Use crypto instead of uuid
const path = require("path");

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("📂 Saving to: uploads/");
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // Use crypto.randomBytes instead of uuid
        const uniqueId = crypto.randomBytes(16).toString("hex");
        const filename = `${file.fieldname}-${uniqueId}${ext}`;
        console.log("💾 Generated filename:", filename);
        cb(null, filename);
    }
});

// Allow only images + videos
const fileFilter = (req, file, cb) => {
    console.log("🔍 File filter checking:", file.mimetype);
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image and video files are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    fileFilter
});

module.exports = {
    single: (fieldName) => upload.single(fieldName),
    array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
    fields: (fieldsArray) => upload.fields(fieldsArray),
};


