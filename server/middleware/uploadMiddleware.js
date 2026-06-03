const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes =
    /jpeg|jpg|png|webp/;

  const extname =
    allowedTypes.test(
      path
        .extname(file.originalname)
        .toLowerCase()
    );

  const mimetype =
    allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only jpg, jpeg, png and webp files are allowed"
    )
  );
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});