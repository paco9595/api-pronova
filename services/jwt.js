'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "Clavesecreta"
exports.creatToken = function(user){
    var payload = {
        _id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1,"d").unix()
    }
    return jwt.encode(payload,secret);
}