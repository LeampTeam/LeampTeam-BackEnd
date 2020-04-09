$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/combo/combos',
            "type": "POST"
        },
        "columns": [
            
            { "data": "_id" },
            { "render":function(data,type,row){
                let li="";
               for(let pro in row.productos){
                  li+=`<li>${pro.code}  ${pro.description}</li>`
               }
               return `<ul>${li}</ul>`
            } 
        },
            { "data": "code" },
            { "data": "description" },
            { "data": "price" },
            { "data": "stock" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/producto/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<a type="button" href=/producto/delete/'+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
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
} );