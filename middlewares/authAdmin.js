'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "Clavesecreta"

function adminAuth(req,res,next){
    if (!req.headers.authorization){
        return res.status(403).send({msg: "no tienes autorizacion"})
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token,secret);
        if(payload.rol !=="Admin"){
            res.status(401).send({msg:"no tienes acceso"})
        }
    }catch(e){
        if(e.message === "Token expired"){
            return res.status(401).send({msg: "token expirado"})
        }
        return res.status(403).send({msg: "Token no vaildo"})
    }
    req.user = payload
    next()
}


module.exports ={
    adminAuth
} 