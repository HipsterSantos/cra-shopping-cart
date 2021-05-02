const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config  = require('config');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const _  = require('lodash');
let {User} = require('../models/user');
// const csrf = require('csurf');
// const csrfProtection  = csrf();
// router.use(csrfProtection);


router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})
router.get('/register',async (req,res)=>{
  res.render('./user/signup/signup');
})
router.post('/register', async (req, res) => {
  var success =(req.body != undefined)??false;
  let user = await User.findOne({email:req.body.email});
  if(user)return res.status(401).json({
    success: false,
    message:'User already registerd , consider sign in'
  });
  user  = User({...req.body});
  user.password = await user.encryptedPassword(req.body.password);
  await user.save();

  const token = user.generateAuthToken();
  var pwd = await user.encryptedPassword(req.body.password);
  res.header('x-auth-token',token).json({
    success:success,
    value:req.body,
    token,
    pwd
  })

});

module.exports = router; 