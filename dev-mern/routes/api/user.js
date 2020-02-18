const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
//const 

router.get('/', (req,res)=>{
    res.json({msg: 'This is from user router'})
})

// @route /api/users/register
// @desc Registration route
// @access public

router.get('/register', (req,res)=>{
    User.findOne({email: req.body.email})
        .then(user =>{
            if(user) {
                res.status(400).json({email: 'email already exists'})
            }
            const gravatar = gravatar.url(req.body.email)
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                gravatar,
                password: req.body.password   
            })
         


        }).catch(e=>{
            console.log(e)
        })


})






module.exports = router