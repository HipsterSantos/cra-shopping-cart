const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const home = require('./routes/home')
const path = require('path');
const config = require('config');
const session = require('express-session');
const passport = require('passport');
const userRoute = require('./routes/user')
app.use(session(
    {secret:'provided-that', 
    resave: false,
     saveUninitialized: false
    }) );
    app.post('/login',(req,res)=>{
        res.send(req.body)
    })
app.use(passport.initialize());
app.use(passport.session());
app.use('/resources', express.static( path.join(__dirname,'resources') ));

//routes

app.use('/users',userRoute)
app.use('/',home);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

console.log(__dirname )
app.listen(`${port}`,()=>{
    console.log(`Listening on port ${port} ...`)
})