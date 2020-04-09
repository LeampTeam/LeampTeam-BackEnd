var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ComboSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    code:Number,  
    stock:Number,
    crateAt:String,
    img:String,
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
    eliminado:Boolean

})



module.exports=mongoose.model('Combo',ComboSchema)