function checkSignIn(req, res,next){
    if (req.session.iduser) {
     
      return next();
    } else {
       res.redirect('/')
    }
 }

 function checkSignInLogin(req, res,next){
   if (req.session.iduser) {
     
      res.redirect('/index/index')
   } else {
      next()
   }
}

 module.exports={
checkSignIn,
checkSignInLogin
    
}