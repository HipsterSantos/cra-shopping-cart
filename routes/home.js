const { Mms } = require('@material-ui/icons');
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping-node')
.then( ()=>{
    console.log('successfull')
})
.catch((err)=>{
    console.log('something went wrong',err)
})
const {Product} = require('../models/product');
router.get('',async (req,res)=>{

console.log(req.session)
    var prod = await Product.find();
    // console.log(prod)
    res.render('home',{products:prod})
})

module.exports = router;