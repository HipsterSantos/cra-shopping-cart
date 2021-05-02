const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config  = require('config');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const _  = require('lodash');
let {User} = require('../models/user');

router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})
router.get('/register',async (req,res)=>{
  res.render('./user/signup/signup');
})
router.post('/', async (req, res) => {
  
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('User already registered.');

//   user = new User(_.pick(req.body, ['name', 'email', 'password']));
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   await user.save();
console.log(req.body)
//   const token = user.generateAuthToken();
  res.send(req.body);
});

module.exports = router; 