const express = require('express');
const cors =  require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');
const db = require('./models');
const app = express();

dotenv.config();

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch((err) => console.error(err));
passportConfig();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3065, () => {
    console.log('server is running ')
}); 