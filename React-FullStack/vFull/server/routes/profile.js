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

router.get("/", validateToken, async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      username: req.user.username,
    },
  });
  res.json(profile);
});
router.get("/profiles", async (req, res) => {
  const profiles = await Profile.findAll({
    order: [["updatedAt", "DESC"]],
  });
  res.json(profiles);
});

router.post("/img", validateToken, upload.single("img"), async (req, res) => {
  const profile = await Profile.create({
    name: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday,
    intro: req.body.intro,
    img: req.file.filename,
    username: req.user.username,
  });
  res.json(profile);
});

module.exports = router;
