var User= require('../model/user');

async function traerInformacionUsuario(idUsuario){

    let datos=await User.findById(idUsuario).exec().then(function(data){
        let info={
            name:data.name,
            surname:data.surname,
            img:data.img,
        
        }
       
        return info
        
    })
   
    return datos
        
    


}
module.exports={
    traerInformacionUsuario
        
    }