var Marca= require('../model/marca');
var path = require('path');
var moment = require('moment')

var infousu=require('../middleware/informacionUsuario')

function grilla(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
        res.render('marcaGrilla',{data});
     })
}

function marcas(req,res){
    let search=req.query.search.value
    Marca.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name ')
    .exec((err,categorias)=>{
        res.json({
            data:categorias,
            draw: req.draw,
            recordsTotal: categorias.length,
            recordsFiltered: categorias.length,
        })  
    })
}

function create(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
         let marca=new Marca()
        res.render('marcaCreate',{data,marca});
     })
}

function createPost(req,res){
    let params=req.body;
    let marca =new Marca();
    if(params.name ){
        marca.name=params.name;
        marca.CreateAt=moment().unix();
        marca.eliminado=false
        marca.save((err,userStored)=>{
            if(err) return res.render('register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/marca/grilla');
            }else{
                res.render('marcaCreate',{message:'Error al guardar'})
            }
        })
    }else{
        marca.name=params.name;
        marca.CreateAt=moment().unix();
        res.render('marcaCreate',{user,message:'Completa todos los campos'}
        )
    }
}

function edit(req,res){
    let id=req.session.iduser;
    let idEdit=req.params.id
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
            Marca.findById(idEdit,function(err,marca){
                res.render('marcaEdit',{data,marca});
            })
     })
}

function editPost(req,res){
    let params=req.body

    Marca.findByIdAndUpdate(params.id, {name:params.name}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/marca/grilla')
    })
}

function borrarMarcas(req,res){
    console.log(req)
    let IdMarcas = req.params.id;
    
    Marca.findByIdAndUpdate(IdMarcas, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //Aqui vamos a poner la ruta desde donde queremos obtener los datos
        return res.redirect('/marca/grilla')
     
    })
}


module.exports={
    grilla,
    marcas,
    create,
    createPost,
    edit,
    editPost,
    borrarMarcas

}