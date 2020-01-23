function checkSignOut(req, res,next){
    if(req.session.user){
        res.redirect('/index/index')   //If session exists, proceed to page
    } else {
      
       next();
    }
 }

 module.exports={
checkSignOut
    
}