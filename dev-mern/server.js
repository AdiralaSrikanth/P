const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

mongoose.connect('mongodb://localhost:27017/social-app' , { useNewUrlParser: true})
    .then(() => {
        console.log('database connected.')
    })
    .catch((err) => {
        console.log(err)
    })
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : false}))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', user)
app.use('/api/profile', profile)
app.use('/api/posts', posts)


app.get('*', (req,res)=>{
    res.json({msg: 404})
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})