$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/users/users',
           
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
            { "data": "surname" },
            { "data": "email" },            
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/users/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<a type="button" href=/users/delete/'+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
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