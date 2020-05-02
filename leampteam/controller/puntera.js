var infousu=require('../middleware/informacionUsuario')
var Categoria= require('../model/categoria');
var Puntera=require('../model/puntera')


function puntera(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
         Categoria.find({},function(err,categorias){
             Puntera.find({},function(err,puntera){
                
                if(puntera.length < 1 && puntera.productos==null){
                   var productos=[];
                    res.render('puntera',{data,categorias,productos});
                }else{
                   var productos=puntera[0].productos
                   console.log(productos)
                    res.render('puntera',{data,categorias,productos});
                }
             }).populate({
                path: 'productos',
                // Get friends of friends - populate the 'friends' array for every friend
                populate: { path: 'categoria' }
              })
                
            
         })

       
     })
}
function guardarProductoPuntera(req,res){
    let id=req.params.id
    console.log(id)
    Puntera.find({},function(err,puntera){
            if(puntera.length>0){
                console.log(puntera)
                puntera[0].productos.push(id)
                 puntera[0].save()
                res.redirect('/puntera/puntera')
            }else{
                let punteraGuardar=new Puntera();
                punteraGuardar.productos.push(id)
                punteraGuardar.save(function(err,save){
                res.redirect('/puntera/puntera')
            })
        }
    
    
    }).populate('productos')
}

function sacarPuntera(req,res){

    let id=req.params.id

    Puntera.find({},function(err,puntera){

        let productos=puntera[0].productos
       let pos=productos.indexOf(id)
       puntera[0].productos.splice(pos,1)
       puntera[0].save(function(err,save){
        res.redirect('/puntera/puntera')
       });
       
    })
}



module.exports={
    puntera,
    guardarProductoPuntera,
    sacarPuntera
}