const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config  = require('config');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
let {User}   = require('../models/user');

router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/register',async(req,res)=>{
   const user  = Usef.find({email:req.body.email});
   if(user) return(400).send('User Already registered , login instead');
   const newUser = new User({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email: req.body.email , 
       password: req.body.password 
      });
    newUser.password = await bcrypt.hash(req.password,await bcrypt.genSalt(12));
    newUser.save();
    
    const token = newUser.generateToken();
    res.header('x-auth-token',token).send(_.pick(newUser,['_id','name','email']))

})

router.post('/login',async(req,res)=>{
    const userPwd = User.find({emal:req})
    const validPwd = bcrypt.compare(req.body.password,User.password)
})