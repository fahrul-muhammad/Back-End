const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now().toString();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const uploads = multer({ storage, fileFilter, limits: { fileSize: 2097152 } });
const single = uploads.single("images");

function multerHandler(req, res, next) {
  single(req, res, (err) => {
    console.log(err.code);
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(500).json({ pesan: "file melebihi size" });
    }
    next();
  });
}

module.exports = multerHandler;
