const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

module.exports = router;
