const dayjs = require("dayjs");
const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

router.get("/", async (req, res) => {
  let listOfPosts = await Posts.findAll({
    attributes: ["id", "title", "username", "updatedAt"],
    order: [
      ["updatedAt", "DESC"],
      ["id", "DESC"],
    ],
  });
  listOfPosts = listOfPosts.map((post) => {
    console.log(post.dataValues.updatedAt);
    post.dataValues.updatedAt = dayjs(post.dataValues.updatedAt)
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");

    return post;
  });
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
