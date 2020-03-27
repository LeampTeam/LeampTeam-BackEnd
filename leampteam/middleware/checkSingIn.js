function checkSignIn(req, res,next){
    if (req.session.logueado) {
       console.log(req.sessionID)
       console.log(req.session)
      return next();
    } else {
       res.redirect('/')
    }
 }

 function checkSignInLogin(req, res,next){
   if (req.session.logueado) {
      console.log(req.sessionID)
      console.log(req.session)
      res.redirect('/index/index')
   } else {
      next()
   }
}

 module.exports={
checkSignIn,
checkSignInLogin
    
}