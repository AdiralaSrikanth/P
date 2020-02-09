const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const app = express()
// server.js
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())
//to use cookie parser
app.use(cookieParser())

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

///controllers 
app.use('/', indexRouter)
app.use('/users' , userRouter)


app.listen(process.env.PORT, ()=> console.log(`server is running at ${process.env.PORT}`) )