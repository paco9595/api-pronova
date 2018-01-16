'use strict'
var mongoose = require('mongoose');
var app = require("./app.js");
var port = process.env.PORT || 3977;
mongoose.connect('mongodb://localhost:27017/pronova',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("conexion realizada ");
        app.listen(port, function(){
            console.log("express escuchando");
            
        })
    }
    
})