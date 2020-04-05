var Producto= require('../model/producto');
var Categoria= require('../model/categoria');
var Fragancia= require('../model/fragancia');
var path = require('path');
var moment = require('moment')

var infousu=require('../middleware/informacionUsuario')

function grilla(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
        res.render('produGrilla',{data});
     })
}

function productos(req,res){
    Producto.find({eliminado: { $ne: true }},'_id name description price code stock')
    .exec((err,producto)=>{
        res.json({
            data:producto,
            draw: 1,
            recordsTotal: producto.length,
            recordsFiltered: producto.length,
        })  
    })
}

function create(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
         let producto=new Producto()
         Categoria.find({},function(error,categorias){
            Fragancia.find({},function(error,fragancias){
                res.render('produCreate',{data,producto,categorias,fragancias});
            })
         })
     })
}

function createPost(req,res){
    let params=req.body;
    console.log(params)
    let producto =new Producto();
    if(params.name ){
        producto.name=params.name;
        producto.code=params.code;
        producto.description=params.description;
        producto.stock=params.stock;
        producto.price=params.price;
        if(params.fragancia==0){
            producto.esFragancia=false
            producto.fragancia=null
        }else{
            producto.esFragancia=true
            producto.fragancia=params.fragancia
        }
        
        producto.categoria=params.categoria;
        producto.img=null  
        producto.CreateAt=moment().unix();
        producto.eliminado=false
        producto.save((err,userStored)=>{
            if(err) return res.render('register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/producto/grilla');
            }else{
                res.render('produCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('produCreate',{user,message:'Completa todos los campos'}
        )
    }
}

function edit(req,res){
    let id=req.session.iduser;
    let idEdit=req.params.id
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)

                Producto.findById(idEdit,function(err,producto){
                    Categoria.find({},function(error,categorias){
                        Fragancia.find({},function(error,fragancias){
                            let checkedo="";
                            console.log(categorias)
                            if(producto.esFragancia){
                                checkedo=true
                            }else{
                                checkedo=false
                            }
                            console.log(producto)
                    res.render('produEdit',{data,producto,categorias,fragancias,checkedo:checkedo});
                })
            })
        }).populate('categoria').populate('fragancia')
    })
}

function editPost(req,res){
    let params=req.body
    console.log(params)
    let pro={
        name:params.name,
        code:params.code,
        description:params.description,
        stock:params.stock,
        price:params.price,
        
       
        categoria:params.categoria,
        
    }
    if(params.fragancia==0){
        pro.esFragancia=false
        pro.fragancia=null
    }else{
        pro.esFragancia=true
        pro.fragancia=params.fragancia
    }
    console.log(pro)

    Producto.findByIdAndUpdate(params.id, pro, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/producto/grilla')
    })
}

module.exports={
    grilla,
    productos,
    create,
    createPost,
    edit,
    editPost

}