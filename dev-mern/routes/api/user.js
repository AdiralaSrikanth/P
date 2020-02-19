const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')

router.get('/', (req,res)=>{
    res.json({msg: 'This is from user router'})
})

// @route POST /api/users/register
// @desc Registration route
// @access public
router.post('/register', (req,res)=>{
    User.findOne({email: req.body.email})
        .then(user =>{
            if(user) {
                res.status(400).json({email: 'email already exists'})
            }
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
            //bcrypt - hash pwd and compare pwd
            bcrypt.genSalt(10, (err, salt)=>{
                if(err) throw err
                bcrypt.hash(newUser.password, salt).then((hash)=>{
                    newUser.password = hash
                    newUser.save().then((user)=>{
                        res.json(user)
                    }).catch(err=> console.log(err))
                })
            })
        }).catch(e=>{
            console.log(e)
        })
})

// @route POST /api/users/login
// @desc login route
// @access public

router.post('/login', (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    User.findOne({email}).then(user=>{
        if(!user) {
            res.status(404).json({email: 'User not found'})
        }
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if(err) throw err
            if(isMatch){
                //will generate token here
             const payload = {id: user.id, name: user.name, avatar: user.avatar}
             jwt.sign(payload, keys.secretOrKey, {expiresIn : '7d'}, (err, token)=>{
                if(err) throw err
                res.json({
                    success: true,
                    token : "Bearer " + token
                })
             })
            } else {
                res.status(400).json({password: 'Incorrect Password'})
            }
        })
    })
})



module.exports = router