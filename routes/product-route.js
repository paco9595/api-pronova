'use strict'
var multipart = require("connect-multiparty")
var express = require('express')
var api = express.Router();


var userController = require("../controllers/user-controller")
var productController = require("../controllers/product-controller")

var md_auth_user = require("../middlewares/authUser.js");
var md_auth_admin = require("../middlewares/authAdmin.js");
var md_update = multipart({uploadDir:'./uploads/users/'})

api.get('/prueba' ,productController.prueba)
api.get('/',productController.productos)
api.post('/crear',md_auth_admin.adminAuth,productController.crear)
api.delete('/delete/:id',md_auth_admin.adminAuth,productController.deleteProduct)
api.put('/updateProducto/:id',md_auth_admin.adminAuth.productController.updateProduct)
// api.get('/login',userController.login)
// api.post('/creat',userController.creat)
// api.put('/updateImage/:id',[md_auth_user.UserAuth,md_update],userController.updateImage)
// api.put('/updateUser/:id',md_auth_user.UserAuth,userController.updateUser)
// api.delete('/deleteUser/:id',md_auth_user.UserAuth,userController.deleteUser)


module.exports = api