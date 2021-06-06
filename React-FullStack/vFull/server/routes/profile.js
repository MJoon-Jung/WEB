const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Profile } = require("../models");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", validateToken, upload.single("img"), (req, res) => {
  console.log(req.body.file);
  res.json({ url: `/img/${req.body.file.name}` });
});

const upload2 = multer();
router.post("/", validateToken, async (req, res, next) => {
  console.log(req.body);
  try {
    const profile = await Profile.create({
      name: req.body.name,
      birthday: req.body.date,
      gender: req.body.gender,
      gender: req.body.gender,
      intro: req.body.intro,
      img: req.body.file.name,
      url: req.body.fileUrl,
      username: req.user.username,
    });
    res.json(profile);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
