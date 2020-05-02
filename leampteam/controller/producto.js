var Producto= require('../model/producto');
var Categoria= require('../model/categoria');
var Fragancia= require('../model/fragancia');
var Marca= require('../model/marca');
var path = require('path');
var fs = require('fs');
var moment = require('moment')

var infousu=require('../middleware/informacionUsuario')

function grilla(req,res){
    let id=req.session.iduser;
     infousu.traerInformacionUsuario(id).then(function(data){
        res.render('produGrilla',{data});
     })
}

function productos(req,res){
    Producto.find({eliminado: { $ne: true }},'_id description price code stock categoria.name img')
        .populate('categoria')
        .exec((err,producto)=>{
           console.log(producto)
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
                Marca.find({},function(error,marcas){
                    res.render('produCreate',{data,producto,categorias,fragancias,marcas});
                })
                
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
        producto.priceMayor=params.priceMayor;
        producto.marca=params.marca;
        if(params.fragancia==0){
            producto.esFragancia=false
            producto.fragancia=null
        }else{
            producto.esFragancia=true
            producto.fragancia=params.fragancia
        }
        
        producto.categoria=params.categoria;
        producto.marca=params.marca;
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
                        Marca.find({},function(error,marcas){
                            Fragancia.find({},function(error,fragancias){
                                let checkedo="";
                                console.log(categorias)
                                if(producto.esFragancia){
                                    checkedo=true
                                }else{
                                    checkedo=false
                                }
                                console.log(producto)
                        res.render('produEdit',{data,producto,categorias,fragancias,marcas,checkedo:checkedo});
                    })
                })
            })
        }).populate('categoria').populate('fragancia').populate('marca')
    })
}

function getProducts(req,res){
    
    let search=req.body.search
    console.log(search)
        Producto.find( {description: new RegExp(search,"i")},function(err,producto){
            
                console.log(producto)    
            return res.status(200).send({producto})
        })
}

function getProduct(req,res){
    
    let id=req.body.id
    console.log(id)
        Producto.findById( id,function(err,producto){
            
                console.log(producto)    
            return res.status(200).send({producto})
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
        priceMayor:params.priceMayor,
        marca:params.marca,
        
       
        categoria:params.categoria,
        marca:params.marca
        
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
function uploadImage(req, res) {
    console.log(req.body.productId)
    var productid = req.body.productId
    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[2];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Producto.findByIdAndUpdate(productid, { img: file_name }, { new: true }, (err, productUpdated) => {
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!productUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.redirect('/producto/grilla')
            })
        } else {
            removeFilesOfUploads(res, file_path, 'La extencion no es valida')

        }
    } else {
        return res.status(200).send({ message: 'No se han subido archivos' })
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.img;
    console.log(imageFile)
    var pathFile = './imagenes/producto/' + imageFile

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(400).send({ message: 'El archivo no fue encotrado' })
        }
    })
}
function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

function borrarProducto(req,res){
    console.log( req)
    let IdProductos = req.params.id;
    
    Producto.findByIdAndUpdate(IdProductos, {eliminado:true} , { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

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
    editPost,
    getProduct,
    getProducts,
    uploadImage,
    getImageFile,
    borrarProducto

}