var producto=require('../controller/producto')
var express = require('express');
var router = express.Router();
var check=require('../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,producto.grilla);
router.post('/productos',check.checkSignIn,producto.productos);
router.get('/create',check.checkSignIn,producto.create);
router.post('/create',check.checkSignIn,producto.createPost);
router.get('/edit/:id',check.checkSignIn,producto.edit);
router.post('/edit',check.checkSignIn,producto.editPost);
router.post('/getProductos',producto.getProducts);
router.post('/getProducto',producto.getProduct);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
