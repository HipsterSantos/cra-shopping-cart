const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const home = require('./routes/home' )
const path = require('path');
const config = require('config');
const session = require('express-session');
const passport = require('passport');
const userRoute = require('./routes/user')
const csrf = require('csurf');
const csrfProtection  = csrf();

app.use(session(
    {secret:'provided-that', 
    resave: false,
    saveUninitialized: false
    }) );


app.set(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/resources',express.static('resources'))
// app.use('/resources', express.static( path.join(__dirname,'resources') ));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/users',userRoute)
app.use('/',home);
app.post('/login',(req,res)=>{
    res.json({
        value:req.body,
        message: 'something was sent',
        ...req.body
    })
})


console.log(__dirname )
app.listen(port,()=>{
    console.log(`Listening on port ${port} ...`)
})