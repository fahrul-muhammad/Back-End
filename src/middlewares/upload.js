const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now().toString();
    cb(null, uniqueSuffix + "-" + file.originalname); //ubah original name
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const uploads = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
const single = uploads.single("profilepic");

function multerHandler(req, res, next) {
  single(req, res, (err) => {
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ pesan: "file melebihi size" });
    }
    next();
  });
}

module.exports = multerHandler;
