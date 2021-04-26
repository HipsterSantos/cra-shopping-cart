
//=====Steps to get start with passport auth ===== 

//---how to use passport as authenticatior method 
import passport  from 'passport' 
import bcrypt from 'bcrypt' 
import {Strategy as LocalStrategy} from 'passport-local';
import Usr as user  from '../models/user';

//--in non-es6
const passport = require('passport');
const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//============ in es6 ================

passport.serializeUser( (user,done)=>{
    done(null,user);
})

passport.deserialize( (id,done)=>{
    User.findById(id).then( (user)=>{
        done(null,user)
    })
})
//======= in non es6 =========
passport.serializeUser( function(user,done){
    done(null,user);
})
passport.deserializeUser( function(id,done){
    User.findById(id,function(err,usr){
        done(err,usr);
    })
})

passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'password'
}),
async (email,password,done)=>{
    try{ 
        const user = await User.findOne({
            email: email
        });
        if(user){
            const isValidPwd = user.validPassword();
            if(isValidPwd){
                done(null,user);

            }else{
                done(null,false);
            }
        }else{
            done(null,false);
        }
    }catch(err){
        console.log('LOCAL Strategy '+err);
        done(err,false);
    }
}

)

//=============non es6 

passport.user('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}),
function (req,email, password,done){
    const user = User.findOne({email:email},function(err,user){ 
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,{message:"Email is already in iuse"});
        }
    })
}

)


