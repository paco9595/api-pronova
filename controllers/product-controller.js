'use strict'

var Product = require('../models/product-model');

function prueba(req,res){
    res.status(200).send({msg:"ok"})
}
function productos(req,res){
    var params = req.query
    console.log(params)
    if(params.tipo !=="case" && params.tipo !=='mica' && params.tipo !=='accesorio'){
        return res.status(400).send({msg:"bad request"})
    }
    Product.find({tipo:params.tipo},(err,productSearch)=>{
        if(err){
            res.status(500).send({msg:err})
        }
        res.status(200).send({productos:productSearch})
    })
}
function crear(req,res){
    var params = req.body;
    if(!params.nombre || !params.tipo || !params.precio || !params.para || !params.descripcion){
        return res.status(400).send({msg:"bad requiest",params})
    }
    var product = new Product(params)

    console.log(product)
    product.save((err,productStored)=>{
        if(err || !productStored){
            return res.status(500).send({msg:"internal error"})
        }
        return res.status(200).send({msg:'ok',product:productStored})
    })   
}
function deleteProduct(req,res){
    var productId = req.params.id
    Product.findById(productId,(err,productSearch)=>{
        if (err){
            return res.status(500).send({msg:"internal error", error:err})
        }
        if(!productSearch){
            return res.status(400).send({msg:"di intorrecto"})
        }
        Product.deleteOne({_id:productId},(err)=>{
            if(err){
                return res.status(500).send({msg:"internal error",error:err})
            }
            return res.status(200).send({msg:"producto Eliminado"})
        })
    })
}
function updateProduct(req,res){
    var productId = req.params.id
    var params = req.query
    var product = new Product(parmas)
    product._id = productId
    Product.findByIdAndUpdate(productId,product,(err,productUpdate)=>{
        if(err){
            return res.status(500).send({msg:"internal error",error: err})
        }
        if(!productUpdate){
            return res.status(400).send({msg:"id no encontrado"})
        }
        res.status(200).send({msg:"producto actualizado",producto:productUpdate})
    })
}
module.exports = {
    prueba,
    productos,
    crear,
    deleteProduct,
    updateProduct
}