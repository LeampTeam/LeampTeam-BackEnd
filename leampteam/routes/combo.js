var combo=require('../controller/combo')
var express = require('express');
var router = express.Router();
var check=require('../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,combo.grilla);
router.post('/combos',check.checkSignIn,combo.combos);
router.get('/create',check.checkSignIn,combo.create);
router.post('/create',check.checkSignIn,combo.createPost);
// router.get('/edit/:id',check.checkSignIn,producto.edit);
// router.post('/edit',check.checkSignIn,producto.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
