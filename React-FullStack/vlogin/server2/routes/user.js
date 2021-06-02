const express = require("express");
const User = require("../models/user");
const { auth } = require("../middlewear/auth");
const router = express.Router();

router.route("/register").post(async (req, res, next) => {
  try {
    const exUser = await User.findOne({ where: { email: req.body.email } });
    if (exUser) {
      return res.status(500).json({
        error: "중복되는 이메일입니다.",
      });
    }
    //create = build + save
    //build는 말그대로 build 만 db에 저장이 안됨 그래서 build().save로 db에 저장해줌
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "email not found",
      });
    }
    if (!user.comparePassword(req.body.password)) {
      return res.json({
        loginSuccess: false,
        message: "password not same",
      });
    }
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userID: user.id });
    });
    return res.json({
      message: "login success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route("/logout").get((req, res) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    User.findByPk(user.id).then((user) => {
      user.update({ token: "" });
    });
  });
});

module.exports = router;
