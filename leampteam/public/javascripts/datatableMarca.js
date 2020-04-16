$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/marca/marcas',
            "type": "POST"
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/marca/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<a type="button" href=/marca/delete/'+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
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