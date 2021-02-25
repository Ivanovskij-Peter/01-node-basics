const { Router } = require("express");
const path = require("path");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const multer = require("multer");
const { asyncWrapper } = require("../helpers/async.wrapper");
const { autorize } = require("../helpers/auth.middleware");
const { getCurrentUser, updateUserAvatar } = require("./user.controller");

const router = Router();

const PUBLIC_FILE_PATH = "public/images";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp/");
  },
  filename: (req, file, cb) => {
    const { ext } = path.parse(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
async function minifyImage(req, res, next) {
  const [file] = await imagemin([req.file.path], {
    destination: PUBLIC_FILE_PATH,
    plugins: [imageminJpegtran(), imageminPngquant()],
  });
  await fsPromises.unlink(req.file.path);
  next();
}
const images = multer({ storage });

router.get("/current", autorize, asyncWrapper(getCurrentUser));
router.patch(
  "/avatars",
  autorize,
  images.single("avatar"),
  minifyImage,
  asyncWrapper(updateUserAvatar)
);

module.exports = router;
