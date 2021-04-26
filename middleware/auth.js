const config = require('config');
const  jwt = require('jsonwebtoken');

module.exports = function Auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token)return res.status(401).send('Token provided is unknown please provide a valid one')
    try{
        const decoded = jwt.verify(token,config.get('jwtprivatekey'));
        req.user = decoded;
        next();
    }catch(e){
        res.status(403).send('Invalid token');
    }
}