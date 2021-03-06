var Combo= require('../model/combo');
var Producto= require('../model/producto');
var path = require('path');
var moment = require('moment')

var infousu=require('../middleware/informacionUsuario')

function grilla(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
        res.render('comboGrilla',{data});
     })
}

function combos(req,res){
    let search=req.query.search.value
    Combo.find({eliminado: { $ne: true }, $or: [{name: new RegExp(search,"i")},{code: new RegExp(search,"i")}]},'_id description price code stock',)
    .populate({
         path: 'producto',
         select: 'code  description -_id'
    })
    .exec((err,combos)=>{
        console.log(combos)
        res.json({
            data:combos,
            draw:req.draw,
            recordsTotal: combos.length,
            recordsFiltered: combos.length,
        })  
    })
}

function create(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
        Producto.find({},function(error,productos){
       
        let combo=new Combo()
            res.render('comboCreate',{data,combo,productos});
        })
    })
}

function createPost(req,res){
    let params=req.body;
    let test=JSON.parse(params.productos)
    console.log(test)
    console.log(params)
    let combo =new Combo();
    if(params.name ){
        for(let i=0;i<test.length;i++){
            combo.producto.push(test[i].id)
        }
        combo.catidadProd=params.productos
        combo.name=params.name;
        combo.code=params.code;
        combo.description=params.description;
        combo.stock=params.stock;
        combo.price=params.price;
        combo.img=null  
        combo.CreateAt=moment().unix();
        combo.eliminado=false
        combo.save((err,userStored)=>{
            if(err) return res.render('register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/combo/grilla');
            }else{
                res.render('comboCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('comboCreate',{user,message:'Completa todos los campos'}
        )
    }
}

function edit(req,res){
    let id=req.session.iduser;
    let idEdit=req.params.id
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)

                Combo.findById(idEdit,function(err,combo){
                   
                    res.render('comboEdit',{data,combo});
                })
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

        return res.redirect('/combo/grilla')
    })
}

function borrarCombo(req,res){
    console.log(req)
    let IdCombo = req.params.id;
    
    Combo.findByIdAndUpdate(IdCombo, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('/combo/grilla')
     
    })
}





module.exports={
    grilla,
    combos,
    create,
    createPost,
    edit,
    editPost,
    borrarCombo

}