const express = require('express')
const router = express.Router()
 
// path-/users

router.get('/',(req,res)=>{
    res.send('hello user')
})

router.get('/login' ,(req,res)=>{
    res.send('user login')
})

router.get('/:id', (req,res)=>{
    res.send(req.params.id)
})



module.exports = router