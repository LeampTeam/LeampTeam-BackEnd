var User= require('../model/user');
var fs = require('fs');
var path = require('path');

function cambiarAvatar(req,res){
    console.log(req.files)
    let id=req.session.iduser
   
   
    if (req.files) {
        var file_path = req.files.foto.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[1];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'GIF') {
            User.findByIdAndUpdate(id, { img: file_name }, { new: true }, (err, userUpdated) => {
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.redirect('/index/index')
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
  var pathFile = './imagenes/' + imageFile

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
module.exports={
    cambiarAvatar,
    getImageFile
}