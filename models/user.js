var mongoose  = require('mongoose');
var jwt = require('jsonwebtoken');
const config = require('config');


const jwtSecret = config.get('jwtprivatekey')

var USchema  = new mongoose.Schema({
    firstname: { type: String},
    lastname: {type: String},
    email:{type: String, required:true},
    pwd: {type: String, required: true}
});

USchema.methods.generateToken = function(){);
    var {firstname,lastname,email,_id} = this;
    var token = jwt.sign({_id,firstname,lastname,email},jwtSecret);
    return token;
}
var User = mongoose.model('User',USchema);
module.exports{
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