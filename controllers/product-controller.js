'use strict'

var Product = require('../models/product-model');

function prueba(req,res){
    res.status(200).send({msg:"ok"})
}
function productos(req,res){
    var params = req.query
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
    var params = req.body
    console.log(params)
    var product = new Product(params)
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
function updateProductImagen(req,res){
    var productId = req.params.id;
    var file_name = "Sin Imagen"
    if (!req.files){
        return res.status(400).send({msg:"imagen no encontrada"})
    }
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\')
    var file_name = file_split[file_split.length-1]
    var file_ext = file_name.split('\.')[1]
    if(file_ext !== 'jpg' && file_ext !== 'png' && file_ext !=='gif'){
        return res.status(200).send({msg:"imgaen con formato incorrecto"})
    }
    Product.findByIdAndUpdate(productId,{img:file_name}, (err,prodctUpdate) =>{
        if(err || !prodctUpdate){
            return res.status(500).send({msg:err})
        }
        return res.status(200).send({product:prodctUpdate})
    })
}
module.exports = {
    prueba,
    productos,
    crear,
    deleteProduct,
    updateProduct,
    updateProductImagen
}