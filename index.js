const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const home = require('./routes/home')
const path = require('path');

app.use('/resources', express.static( path.join(__dirname,'resources') ));
app.use('*',home);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

console.log(__dirname )
app.listen(`${port}`,()=>{
    console.log(`Listening on port ${port} ...`)
})