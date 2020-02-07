const express = require('express')
const app = express()
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)



const port = process.env.PORT || 5000 

mongoose.connect('mongodb://127.0.0.1:27017/dev-connector')
.then(()=>{
        console.log('connected to db')
}).catch((e)=>{
    console.log(e)
})

app.get('/', (req,res)=>{
    res.send('Home route')
})

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})