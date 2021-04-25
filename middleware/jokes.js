const config = require('config');
const  jwt = require('jsonwebtoken');


module.exports = function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token)return res.status(401).send('Access denied ,Token required');
    try{
    const decode  = jwt.verify(token,config.get('jwtprivatekey'));
    req.user = decode;
    next();
    }catch(e){
        console.log('something went wrong')
        res.status(400).send('Invalid token');
    }
}