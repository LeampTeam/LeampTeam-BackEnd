var Fragancia= require('../model/fragancia');
var path = require('path');
var moment = require('moment')

var infousu=require('../middleware/informacionUsuario')

function grilla(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
        res.render('fragaGrilla',{data});
     })
}

function fragancias(req,res){
    Fragancia.find({eliminado: { $ne: true }},'_id name ')
    .exec((err,fragancia)=>{
        res.json({
            data:fragancia,
            draw: 1,
            recordsTotal: fragancia.length,
            recordsFiltered: fragancia.length,
        })  
    })
}

function create(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
         let fragancia=new Fragancia()
        res.render('fragaCreate',{data,fragancia});
     })
}

function createPost(req,res){
    let params=req.body;
    let fragancia =new Fragancia();
    if(params.name ){
        fragancia.name=params.name;
        fragancia.CreateAt=moment().unix();
        fragancia.eliminado=false
        fragancia.save((err,userStored)=>{
            if(err) return res.render('register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/fragancia/grilla');
            }else{
                res.render('fragaCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('fragaCreate',{user,message:'Completa todos los campos'}
        )
    }
}

function edit(req,res){
    let id=req.session.iduser;
    let idEdit=req.params.id
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
            Fragancia.findById(idEdit,function(err,fragancia){
                res.render('fragaEdit',{data,fragancia});
            })
     })
}

function editPost(req,res){
    let params=req.body

    Fragancia.findByIdAndUpdate(params.id, {name:params.name}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/fragancia/grilla')
    })
}

module.exports={
    grilla,
    fragancias,
    create,
    createPost,
    edit,
    editPost

}