var mongoose  = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


const jwtSecret = 'jwtprivatekey';

var USchema  = new mongoose.Schema({
    firstname: { type: String},
    lastname: {type: String},
    email:{type: String, required:true},
    password: {type: String, required: true}
});

USchema.methods.generateAuthToken= function(){
    var {firstname,lastname,email,_id} = this;
    var token = jwt.sign({_id,firstname,lastname,email},jwtSecret,{
        expiresIn:'30m'
    });
    return token;
}

USchema.methods.encryptedPassword = async function(password){
    var salt =  await bcrypt.genSalt(10);
    var password =  await bcrypt.hash(password,salt);
    return password;
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