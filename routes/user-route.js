'use strict'
var multipart = require("connect-multiparty")
var express = require('express')
var api = express.Router();


var userController = require("../controllers/user-controller")

var md_auth_user = require("../middlewares/authUser.js");
var md_auth_admin = require("../middlewares/authAdmin.js");
var md_update = multipart({uploadDir:'./uploads/users/'})

api.get('/prueba',md_auth_user.UserAuth ,userController.pruebas)
api.get('/login',userController.login)
api.post('/creat',userController.creat)
api.put('/updateImage/:id',[md_auth_user.UserAuth,md_update],userController.updateImage)
api.put('/updateUser/:id',md_auth_user.UserAuth,userController.updateUser)
api.delete('/deleteUser/:id',md_auth_user.UserAuth,userController.deleteUser)


module.exports = api