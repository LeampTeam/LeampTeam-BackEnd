var marca=require('../controller/marca')
var express = require('express');
var router = express.Router();
var check=require('../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,marca.grilla);
router.get('/marcas',check.checkSignIn,marca.marcas);
router.get('/create',check.checkSignIn,marca.create);
router.post('/create',check.checkSignIn,marca.createPost);
router.get('/edit/:id',check.checkSignIn,marca.edit);
router.post('/edit',check.checkSignIn,marca.editPost);
// router.post('/delete',check.checkSignIn,marca.delete);

module.exports = router;
