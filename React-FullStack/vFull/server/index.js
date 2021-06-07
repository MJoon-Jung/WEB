const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/img", express.static(path.join(__dirname, "uploads")));

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const profileRouter = require("./routes/Profile");
app.use("/profile", profileRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
