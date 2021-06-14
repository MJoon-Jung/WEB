const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (user) return res.json({ error: "이미 존재하는 유저가 있습니다" });
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("SUCCESS");
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "이메일이 존재하지 않습니다" });

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "비밀번호가 틀렸습니다." });

      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({ token: accessToken, username: username, id: user.id });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.delete("/quit", validateToken, async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.user.id);
    await user.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
