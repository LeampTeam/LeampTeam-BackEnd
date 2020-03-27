var express = require('express');
var router = express.Router();
var user=require('../controller/usuarios')
var check=require('../middleware/checkSingIn')


/* GET users listing. */
router.post('/users',user.getUsers );
router.get('/listUser',user.listUser );
router.post('/register',user.saveUser );
router.get('/register',user.register );
router.get('/login',check.checkSignInLogin,user.login );
router.get('/logout',user.logout);
router.post('/login',user.loginUser );

module.exports = router;
