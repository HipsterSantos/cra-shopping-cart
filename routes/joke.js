const express = require('express');
const mongoose = require('mongoose'); 
const config  = require('config');
const jwt  = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const _ = require('lodash');
const {auth,admin} = require('../middleware/jokes')
const {User} = require('../models/user');
const router = express.Router();
//const joi = require('joi');
router.post('/auth', auth, async (req,res)=>{
    const pwd = bcrypt.compare(User.password,req.password);
    const thereIsUser = User.find({email: req.email}); 
    if(!user || !pwd)return res.status(400).send('Invalild email or password.')
    const user = User.find({_id:req.user._id})
    .select('-password');
    res.send(user);
})

//authorization
router.get('/me', auth ,async(req,res)=>{
    const user =  User.find({_id: req.user._id})
    .select('-password');
    res.send(user);
})
router.delete('/:id',[auth,admin],async (req,res)=>{
    res.send('user deleted')
})
//authentication
router.post('/signup', async (req,res)=>{
    //here sits the whole sign up process
    
    if(thereIsUser) return res.status(400).send(' This user is already signed in ');
    const newUser = new User({
        firstname: req.firstname,
        lastname: req.lastname,
        email: req.email,
        pwd:  req.password
    });

    const ChainingPassword = await bcrypt.hash(req.password,await bcrypt.genSalt(12))
    newUser.password = ChainingPassword;
     
    const token = jwt.sign({id: newUser._id},config.get('jwtprivatekey'));
    newUser.save();
    res.header('x-path-auth',token).send(_.pick(req,['firstname','lastname','email']))
})
module.exports  = router;