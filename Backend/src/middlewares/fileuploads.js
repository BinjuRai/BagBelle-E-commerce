// const multer = require("../../utils/multer");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

// // Storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname); // Get file extension
//         const filename = `${file.fieldname}-${uuidv4()}${ext}`;
//         cb(null, filename);
//     }
// });

// // File filter to accept only images and videos
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image and video files are allowed"), false);
//     }
// };

// // Multer upload configuration
// const upload = multer({
//     storage,
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
//     fileFilter
// });

// module.exports = {
//     single: (fieldName) => upload.single(fieldName),
//     array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
//     fields: (fieldsArray) => upload.fields(fieldsArray),
// };
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

const multerInstance = multer({
  storage,
  fileFilter,
});

module.exports = multerInstance;
