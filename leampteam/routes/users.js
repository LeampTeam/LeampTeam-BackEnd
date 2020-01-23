var express = require('express');
var router = express.Router();
var user=require('../controller/usuarios')
var check=require('../middleware/checkSingIn')
var checkOut=require('../middleware/checkSingOut')

/* GET users listing. */
router.post('/users',user.getUsers );
router.get('/listUser',check.checkSignIn,user.listUser );
router.post('/register',user.saveUser );
router.get('/register',checkOut.checkSignOut,user.register );
router.get('/login',checkOut.checkSignOut,user.login );
router.get('/logout',user.logout);
router.post('/login',user.loginUser );

module.exports = router;
