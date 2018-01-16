'use strict'

var express = require('express')
var bodyparse = require('body-parser');
var app = express();

var user_routes = require("./routes/user-route.js");

//settings que respuesta va ser tipo json
app.use(bodyparse.urlencoded({extended:true}));
app.use(bodyparse.json());

app.use('/user',user_routes);



module.exports = app;