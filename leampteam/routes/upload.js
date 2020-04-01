var express = require('express');
var router = express.Router();
var upload=require('../controller/upload');
var check=require('../middleware/checkSingIn');
var multipart=require('connect-multiparty')
var md_upload = multipart({uploadDir:'./imagenes'})


router.post('/upload',[check.checkSignIn,md_upload],upload.cambiarAvatar );
router.get('/getImage/:img',upload.getImageFile );


module.exports = router;