
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const dotenv = require('dotenv')


dotenv.config()

const userRouter = require('./routes/user')
const { sequelize } = require('./models')


sequelize.sync({ force : false })
    .then(() => {
        console.log('database connect success')
    })
    .catch((err)=>{
        console.error(err);
    })

app.use(morgan('dev'))    
app.use(express.json());
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,        
    }
}))


app.get('/', (req,res)=>{
    res.send('adsfasfd');
})

app.use('/app/user', userRouter)

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });


app.listen(port, ()=>{ 
    console.log(`Server running on port ${port}`)
})