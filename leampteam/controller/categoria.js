var Categoria= require('../model/categoria');
var path = require('path');
var moment = require('moment')

var infousu=require('../middleware/informacionUsuario')

function grilla(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
        res.render('cateGrilla',{data});
     })
}

function categorias(req,res){
    Categoria.find({eliminado: { $ne: true }},'_id name ')
    .exec((err,categorias)=>{
        res.json({
            data:categorias,
            draw: 1,
            recordsTotal: categorias.length,
            recordsFiltered: categorias.length,
        })  
    })
}

function create(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
         let categoria=new Categoria()
        res.render('cateCreate',{data,categoria});
     })
}

function createPost(req,res){
    let params=req.body;
    let categoria =new Categoria();
    if(params.name ){
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        categoria.eliminado=false
        categoria.save((err,userStored)=>{
            if(err) return res.render('register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/categoria/grilla');
            }else{
                res.render('cateCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('cateCreate',{user,message:'Completa todos los campos'}
        )
    }
}

function edit(req,res){
    let id=req.session.iduser;
    let idEdit=req.params.id
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
            Categoria.findById(idEdit,function(err,categoria){
                res.render('cateEdit',{data,categoria});
            })
     })
}

function editPost(req,res){
    let params=req.body

    Categoria.findByIdAndUpdate(params.id, {name:params.name}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/categoria/grilla')
    })
}

module.exports={
    grilla,
    categorias,
    create,
    createPost,
    edit,
    editPost

}