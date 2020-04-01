var express = require('express');
var router = express.Router();
var user=require('../controller/usuarios')
var check=require('../middleware/checkSingIn')


/* GET users listing. */
router.post('/users',user.getUsers );
router.get('/listUser',check.checkSignIn,user.listUser );
router.post('/register',user.saveUser );
router.get('/create',check.checkSignIn,user.createUser );
router.get('/edit/:id',check.checkSignIn,user.editUser );
router.get('/register',user.register );
router.get('/login',check.checkSignInLogin,user.login );
router.get('/logout',user.logout);
router.post('/login',user.loginUser );
router.post('/edit',check.checkSignIn,user.editUserPost );

module.exports = router;
