$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/combo/combos',
          
        },
        "columns": [
            
            { "data": "_id" },
            { "render":function(data,type,row){
                console.log(row)
               
                let li="";
               for(let i=0;i< row.producto.length;i++){
                  li+=`<li>${row.producto[i].code}  ${row.producto[i].description}</li>`
               }
               return `<ul>${li}</ul>`
            } 
        },
            { "data": "code" },
            { "data": "description" },
            { "data": "price" },
            { "data": "stock" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/combo/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<button id="borrar" name='+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
            }
        }
        ],
        "columnDefs": [
           
            {
                "targets": 0 ,
                "visible": false,
                "searchable": false
            }
            
        ]
       
    } );

    $("#example").on( "click","#borrar" ,function() {
        var id=$(this).attr('name')

    //Modal
    let modal = confirm('Desea borrar el usuario')
    if (modal == true) {
        $.get("http://localhost:3000/combo/borrarCombo/"+id, function( data ) {
            window.location.reload()
           });
           alert ('Se elimino el usuario')
      } else {
            alert ('No se elimino el usuario')
      }

    }); 

    
} );