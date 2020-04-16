$( document ).ready(function() {
    let productosList=[]
    let productosId=[]
    let productoEnviar=[]
    $(document).click(function(){
        $('.searched').hide()
    })
   $('#searchproducto').keyup(function(){
       let search=$(this).val()
       let id=$(this).val();
       if(search.length>2){
    $.post( "http://127.0.0.1:3000/producto/getProductos", { search: search }, function( data ) {

        console.log(data)
        
        let dropD=''
        let prod=data.producto
        if(prod.length>0){

        for(let i=0;i<prod.length;i++){
            dropD+='<p class="resulsearch" style="cursor:pointer" id='+prod[i]._id+'>'+prod[i].code +'    '+prod[i].description+'<p>'
        }
        $('.searched').html(dropD)
        $('.searched').show()
        }else{
            $('.searched').html('No se encontro ningun registro')
            $('.searched').show()
        }
       
      });
    }
   })
   $('.searched ').on('click','.resulsearch',function(){
       let id=$('.resulsearch').attr('id')
       let texto=$('.resulsearch').html()
    $('#idProd').val(id)
    $('.pmodal').html(texto)
    $('#searchproducto').val('')
    $('#cantidadModal').modal('show');
           $('.searched').hide()
   })
   $('#aceptarModal').click(function(){
       let id=$('#idProd').val();
    $.post( "http://127.0.0.1:3000/producto/getProducto", { id: id }, function( data ) {


         if(!productosId.includes(data.producto._id)){
        productosList.push(data.producto)
        productosId.push(data.producto._id)
        productoEnviar.push({id:data.producto._id,cantidad:$('#cantidad').val()})
        let tbody='';
        for(let i=0;i<productosList.length;i++){
            tbody+=`<tr class=rows><td class='d-none' hidden'>${productosList[i]._id}</td><td>${productosList[i].code}</td><td>${productosList[i].description}</td><td>${productosList[i].price}</td>
            <td>${productoEnviar[i].cantidad}</td></tr>`
        }
        $( "#tbody" ).html( tbody );
        

        
        let arrayProd=JSON.stringify(productoEnviar)
        $('#productos').val(arrayProd)
        $('#cantidadModal').modal('hide');
        $('#cantidad').val("")
        }else{
            alert('ya esta cargado')
        }
    })
   })
});