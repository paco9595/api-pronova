'use strict'
var User = require('../models/user-model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function pruebas(req,res){
    res.status(200).send({mgs:"ok"})
}
function login(req,res){
    var query = req.query
    var email = query.email
    var pass = query.pass
    if(!query.email && !query.pass){
        res.status(500).send({req:req.query})
    }
    User.findOne({email:query.email.toLowerCase()},(err,userSearch)=> {
        if(err){
            return res.status(500).send({msg:"Error buscando usuario"})
        }
        if(!userSearch){
            return res.status(404).send({msg:"correo no encontrado"})   
        }
        bcrypt.compare(pass,userSearch.password,(err,check) =>{
            if(!check){
                return res.status(500).send({msg:"password Incorrecta"})
            }
            if(err){
                return res.status(500).send({msg:"Error buscando usuario"})
            }
            if(query.token){
                return res.status(200).send({token: jwt.creatToken(userSearch)})
            }else{
                return res.status(200).send({user:userSearch})
            }
        })
    })
}
function creat(req,res){
    var params = req.body;
    if(!params.nombre || !params.apellido || !params.email || !params.password){
        return res.status(400).send({msg:"datos insuficentes"})
    }
    var user = new User(params);
    user.rol = 'user';
    user.image = 'null';
    bcrypt.hash(params.password,null,null,(err,hash)=>{
        if(err || !hash){
            return res.status(500).send({msg:"error al momento de encriptar contrase;a"})
        }
        user.password = hash
        User.findOne({email:user.email},(err,userSearch) =>{
            if(err){
                return res.status(500).send({msg:"internal error"})
            }
            if(userSearch){
                return res.status(400).send({msg:"ese Correo ya fue utilizado"})
            }
            user.save((err,userSaved)=>{
                if(err && !userSaved){
                    return res.status(500).send({msg:"error al momento de guardar"})
                }
                return res.status(200).send({msg:"usuario Guardado"})
            })
        })
    })
    
}
function updateImage(req,res){
    var userId = req.params.id;
    var file_name = "Sin Imagen"
    if (!req.files){
        return res.status(400).send({msg:"imagen no encontrada"})
    }
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\')
    var file_name = file_split[file_split.length-1]
    var file_ext = file_name.split('\.')[1]
    console.log(file_ext);
    if(file_ext !== 'jpg' && file_ext !== 'png' && file_ext !=='gif'){
        return res.status(200).send({msg:"imgaen con formato incorrecto"})
    }
    User.findByIdAndUpdate(userId,{image:file_name}, (err,userUpdate) =>{
        if(err || !userUpdate){
            return res.status(500).send({msg:""})
        }
        return res.status(200).send({user:userUpdate})
    })
}
function updateUser(req,res){
    var userId =req.params.id
    var params = req.body
    var user = new User(params)
    user._id = userId;
    user.rol = "user"
    var user_id = userId
    if(params.password){
        user.password = bcrypt.hashSync(params.password,null)
        console.log(user.password)
    }
    console.log(user)
    User.findByIdAndUpdate(userId,user,(err,userUpdate)=>{
        if(err){
            return res.status(500).send({msg:err.message})
        }
        return res.status(200).send({msg:"ok",user:userUpdate})
    })
    
}
function deleteUser(req,res){
    var userId = req.params.id
    User.deleteOne({_id:userId},(err)=>{
        if(err){
            return res.status(500).send({msg:"error eliminado usuario"})
        }
        return res.status(200).send({msg:"usuario eliminado"})
    })
}
module.exports = {
    pruebas,
    login,
    creat,
    updateImage,
    updateUser,
    deleteUser
};