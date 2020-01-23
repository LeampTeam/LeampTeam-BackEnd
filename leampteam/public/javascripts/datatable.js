$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/users/users',
            "type": "POST"
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
            { "data": "surname" },
            { "data": "email" },            
            {"render": function ( data, type, row ) {
                return '<button type="button" id="'+row._id+'" class="btn btn-light"><i class="fas fa-pencil-alt"></i></button>'
                +'<button type="button" id="'+row._id+'" class="btn btn-light"><i class="fas fa-trash"></i></button>'
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