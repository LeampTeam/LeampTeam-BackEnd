var index=require('../controller/index')
var express = require('express');
var router = express.Router();
var check=require('../middleware/checkSingIn')

router.get('/index',check.checkSignIn,index.index);

module.exports = router;
