'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    nombre: String,
    img: String,
    tipo: String,
    precio: Number,
    descripcion: String,
    para: Array,
    vistas: Array,
})

module.exports = mongoose.model('Producto',ProductoSchema)