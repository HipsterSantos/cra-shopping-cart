const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config  = require('config');
const mongoose = require('mongoose');

let {User}   = require('../models/user');

router.post('/auth',async(req,res)=>{
    const upwd = User.find({pwd:req.body.password});
    const uemail = User.find({email:req.body.email});
    const validPwd = brcypt.compare(upwd,req.body.password);
    if(!uemail || validPwd) return res.status(400).send('Invalid email or password');
    
    const token = uemail.generateToken();
    res.send(token);
})