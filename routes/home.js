const { Mms } = require('@material-ui/icons');
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const passport  = require('passport'); 

//we should import right her e csrf  = require('csurf');
mongoose.connect('mongodb://localhost/shopping-node')
.then( ()=>{
    console.log('successfull')
})
.catch((err)=>{
    console.log('something went wrong',err)
})
const {Product} = require('../models/product');

//and the initialize it right herer  like : var csrfProtection  = csrf();
//and the send it to the client after render a page 
router.get('',async (req,res)=>{

console.log(req.session)
    var prod = await Product.find();
    // console.log(prod)
    res.render('home',{products:prod})
})

router.get('/user/signup',async function(req,res,next){
    res.render('user/signup')
})

router.get('/profile',async function(req,res){
    res.render('profile');
})

router.post('/user/signup',passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirect: '/user/signup'
}))



module.exports = router;