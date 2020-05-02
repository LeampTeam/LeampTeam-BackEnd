var producto=require('../controller/producto')
var express = require('express');
var router = express.Router();
var check=require('../middleware/checkSingIn')
var multipart=require('connect-multiparty')
var md_upload = multipart({uploadDir:'./imagenes/producto'})

router.get('/grilla',check.checkSignIn,producto.grilla);
router.post('/productos',check.checkSignIn,producto.productos);
router.get('/create',check.checkSignIn,producto.create);
router.post('/create',check.checkSignIn,producto.createPost);
router.get('/edit/:id',check.checkSignIn,producto.edit);
router.post('/edit',check.checkSignIn,producto.editPost);
router.post('/getProductos',producto.getProducts);
router.post('/getProducto',producto.getProduct);
router.get('/delete/:id',producto.borrarProducto);
router.post('/upload',md_upload,producto.uploadImage );
router.get('/getImageFile/:img',producto.getImageFile );

module.exports = router;
