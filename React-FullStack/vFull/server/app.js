const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./models");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.set("port", process.env.PORT || 3001);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/img", express.static(path.join(__dirname, "uploads")));

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const profileRouter = require("./routes/Profile");
app.use("/profile", profileRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
