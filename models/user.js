var mongoose  = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


const jwtSecret = 'jwtprivatekey';

var USchema  = new mongoose.Schema({
    firstname: { type: String},
    lastname: {type: String},
    email:{type: String, required:true},
    pwd: {type: String, required: true}
});

USchema.methods.generateToken = function(){
    var {firstname,lastname,email,_id} = this;
    var token = jwt.sign({_id,firstname,lastname,email},jwtSecret,{
        expiresIn:'30m'
    });
    return token;
}

USchema.methods.encryptPassword = async function(password){
    return await bcrypt.hash(password, await bcrypt.genSalt(10));
}
USchema.methods.validPassword = function (password){
 return bcrypt.compare(password,this.password);
} 

var User = mongoose.model('User',USchema);
module.exports = {
    User
}

//install csrf(cross-site-request-forgery) or csurf, express-session
/**?

var csrf = require('csurf')
var proctectinCSRF = csrf();
req.csrfToken(); send it like {csrftoken: req.csrfToken()}
*/
//add json webtoken at this phase 

/**
Token for oAuth
*/