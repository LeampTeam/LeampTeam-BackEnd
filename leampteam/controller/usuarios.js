var User= require('../model/user');
var path = require('path');
var moment = require('moment')
var bcrypt=require('bcrypt-nodejs')
var infousu=require('../middleware/informacionUsuario')

function getUsers(req,res){
    User.find({eliminado: { $ne: true }},'_id name surname email')
    .exec((err,productos)=>{
        res.json({
            data:productos,
            draw: 1,
            recordsTotal: productos.length,
            recordsFiltered: productos.length,
        })  
    })
}
function login(req,res){
    res.render('login')
}

function register(req,res){
    var user=new User()
    res.render('register',{user})
}
function logout(req, res){
    req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
            res.redirect('/');
        }
        
      });
    }
function saveUser(req,res){
    var params=req.body;
    var user =new User();
    if(params.name && params.surname && params.email && params.pass){
        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email.toLowerCase();
        user.CreateAt=moment().unix();
        user.img="default.jpg",
        user.eliminado=false
        if(params.pass!==params.passR){
            res.render('register',{user,message:'Las contraseñas no son iguales'})
        }
        User.find({$or: [
                {email: user.email.toLowerCase()}
        ]}).exec((err,users)=>{
            if(err) return res.render('register',{message:'Se produjo un error, intente nuevamente'})
            
            if(users && users.length>=1){
                return res.render('register',{user,message:'Ya hay un usuario registrado con este mail'})
            }else{
                bcrypt.hash(params.pass,null,null,(err,hash)=>{
                    user.password=hash;
        
                    user.save((err,userStored)=>{
                        if(err) return res.render('register',{message:'Error al guardar el usuario'})
        
                        if(userStored){
                            res.redirect('/users/login');
                        }else{
                            res.render('register',{message:'No se ha registrado el usuario'})
                        }
                    })
                })
            }
        })
    }else{
        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email;
        user.CreateAt=moment().unix();
        res.render('register',{user,message:'Completa todos los campos'}
        )
    }
}
function loginUser(req,res){
    var params=req.body;
    var email=params.email.toLowerCase();
    var pass=params.pass;

    User.findOne({email:email},(err,user)=>{
        if(err) return res.render('login',{message:'Algo salio mal'});
        if(user){
            bcrypt.compare(pass,user.password,(err,check)=>{
                if(check){
                    
                    req.session.iduser=user._id
                   
                    return res.redirect('/index/index')
                }else{
                    return res.render('login',{message:'algunos de los datos esta mal'})
                }
            })
        }else{
            return res.render('login',{message:'no se encontro el usuario'}) 
        }
    })
}
function listUser(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
        res.render('grilla',{data});
     })
}

function createUser(req,res){
    let id=req.session.iduser;
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
            var user=new User()
        res.render('userCreate',{data,user});
     })
}
function editUser(req,res){
    let id=req.session.iduser;
    let idEdit=req.params.id
    
     infousu.traerInformacionUsuario(id).then(function(data){
            console.log(data)
            User.findById(idEdit,function(err,user){
                res.render('userEdit',{data,user});
            })
     })
}

function editUserPost(req,res){
    let params=req.body

            User.findByIdAndUpdate(params.id, {name:params.name,surname:params.surname,email:params.email }, { new: true }, (err, userUpdated) => {
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.redirect('/users/listUser')
            })
}
module.exports={
    getUsers,
    listUser,
    saveUser,
    register,
    login,
    loginUser,
    logout,
    createUser,
    editUser,
    editUserPost
}