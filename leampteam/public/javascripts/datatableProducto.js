$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/producto/productos',
            
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "code" },
            { "data": "categoria.name" },
            { "data": "description" },
            { "data": "price" },
            { "data": "stock" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/producto/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<a type="button" href=/producto/delete/'+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
                +'<button name="'+row._id+'" myimg="'+row.img+'" type="button" class="btn btn-primary " id="imagen" data-toggle="modal" data-target="#cargaImagen"><i class="fas fa-image"></i></button>'
            }
        }
        ],
        "columnDefs": [
           
            {
                "targets": 0 ,
                "visible": false,
                "searchable": false
            },
        
        ]
       
    } );
    $( "#example").on( "click","#imagen" ,function() {
      
        console.log( $( this ).attr('name') );
        $('#productId').val($(  this ).attr('name'))
        var imagen=$(  this).attr('myimg')
      
       
        var html='<img src="http://127.0.0.1:3000/producto/getImageFile/'+imagen +'"/>'
        $('#imagenFoto').html(html)
            
        });
} );