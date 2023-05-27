// * Require
const express = require('express');
const app = express();
const route = require('./router/index');
const port = 3030;
const bodyParser = require("body-parser");
const path = require("path");


// * Configuration
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
// * Routes
app.use('/', route);


// * Listen -> Port
app.listen(port, () => { console.log("localhost:" + port) })