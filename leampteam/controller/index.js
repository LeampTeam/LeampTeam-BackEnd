var infousu=require('../middleware/informacionUsuario')

 function index(req,res) {
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
        res.render('index',{data});
     })
    
    
    
}
module.exports={
    index
}