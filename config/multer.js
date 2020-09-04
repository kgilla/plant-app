const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = {
  upload: multer({
    storage,
    limits: { fileSize: 10000000 },
  }).single("image"),
};
