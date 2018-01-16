'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nombre : String,
    apellido: String,
    telefono: Number,
    email: String,
    password: String,
    rol: String,
    image: String
})

module.exports = mongoose.model('User',UserSchema)