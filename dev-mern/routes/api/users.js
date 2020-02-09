const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

router.get('/test', (req, res) => {
    res.json({ msg: 'this is from users route' })
})

//@route POST api/users/register
//@desc User registration
//access Public

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return console.log(err)
                    }
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err)
                        }
                        newUser.password = hash
                        newUser.save()
                            .then((user) => {
                                res.json(user)
                            })
                            .catch((e) => {
                                console.log(e)
                        })
                    })
                })

            }
        }).catch((e) => {
            console.log(e)
        })
})

//@route POST api/users/login
//@desc User login
//access Public

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(404).json({ email: 'User not found' })
            }
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // res.json({ message: 'login success' })
                    const payload = {id: user.id, name: user.name, avatar: user.avatar}
                        
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: "7d"}, (err, token)=>{
                        res.json({
                            sucess: true,
                            token: "Bearer " + token
                        })
                    })
                    } else {
                        res.status(400).json({ message: 'Incorrect password' })
                    }
                })
        })
})

//Private routes - Need authentication//Use passport








module.exports = router;