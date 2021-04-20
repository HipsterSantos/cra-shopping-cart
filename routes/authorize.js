const jwt = require('jsonwebtoken');
const express = require('express'); 
const router = express.Router();
const config = require('config');
module.exports = async function (req,res,next){
    const token  = req.header('x-auth-token'); 
    if(!token)return res.status(401).json({success:false,message:'Unknown token, access denied'});
    try{
        const decoded = jwt.verify(token,config.get('jwtprivatekey'));
        req.user = decoded;
        next();

    }catch(er){
        res.status(404).send('Invalid token');
    }
}