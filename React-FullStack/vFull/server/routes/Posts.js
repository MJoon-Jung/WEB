const dayjs = require("dayjs");
const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
const sequelize = require("sequelize");
const Op = sequelize.Op;

dayjs.extend(utc);
dayjs.extend(timezone);
function timeSetting(list) {
  list = list.map((post) => {
    post.dataValues.updatedAt = dayjs(post.dataValues.updatedAt)
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");

    return post;
  });
  return list;
}

router.get("/", async (req, res) => {
  try {
    let listOfPosts = await Posts.findAll({
      attributes: ["id", "title", "username", "updatedAt"],
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    listOfPosts = timeSetting(listOfPosts);
    res.json(listOfPosts);
  } catch (err) {
    console.error(err);
  }
});

router.get("/userpage", validateToken, async (req, res) => {
  try {
    let listOfPosts = await Posts.findAll({
      where: { username: req.user.username },
      attributes: ["id", "title", "username", "updatedAt"],
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    listOfPosts = timeSetting(listOfPosts);
    res.json(listOfPosts);
  } catch (err) {
    console.error(err);
  }
});
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
  } catch (err) {
    console.error(err);
  }
});
router.get("/title/:searchValue", validateToken, async (req, res) => {
  try {
    const searchValue = req.params.searchValue;
    console.log(searchValue);
    let listOfPosts = await Posts.findAll({
      where: {
        title: { [Op.like]: `%${searchValue}%` },
      },
      attributes: ["id", "title", "username", "updatedAt"],
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    listOfPosts = timeSetting(listOfPosts);
    console.log(listOfPosts);
    res.json(listOfPosts);
  } catch (err) {
    console.error(err);
  }
});
router.get("/posttext/:searchValue", validateToken, async (req, res) => {
  try {
    const searchValue = req.params.searchValue;
    console.log(searchValue);
    let listOfPosts = await Posts.findAll({
      where: {
        postText: { [Op.like]: `%${searchValue}%` },
      },
      attributes: ["id", "title", "username", "updatedAt"],
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    listOfPosts = timeSetting(listOfPosts);
    console.log(listOfPosts);
    res.json(listOfPosts);
  } catch (err) {
    console.error(err);
  }
});
router.get("/titleposttext/:searchValue", validateToken, async (req, res) => {
  try {
    const searchValue = req.params.searchValue;
    console.log(searchValue);
    let listOfPosts = await Posts.findAll({
      where: {
        [Op.or]: [
          { postText: { [Op.like]: `%${searchValue}%` } },
          { title: { [Op.like]: `%${searchValue}%` } },
        ],
      },
      attributes: ["id", "title", "username", "updatedAt"],
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    listOfPosts = timeSetting(listOfPosts);
    console.log(listOfPosts);
    res.json(listOfPosts);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      postText: req.body.postText,
      username: req.user.username,
    };
    await Posts.create(post);
    res.json(post);
  } catch (err) {
    console.error(err);
  }
});

router.put("/", validateToken, async (req, res) => {
  try {
    const post = await Posts.findByPk(req.body.id);
    post.title = req.body.title;
    post.postText = req.body.postText;
    console.log(post);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findOne({
      where: { id: id, username: req.user.username },
    });
    console.log(post);
    if (!post) {
      return res.json({ success: false });
    }
    await post.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
