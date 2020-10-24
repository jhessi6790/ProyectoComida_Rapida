const mongoose = require('../connect');
var mon = require('mongoose');
var Schema = mon.Schema;
const rest={
    name:{
        type: String,
        required: [true, 'debe poner un nombre']
    }, 
    nit:{
        type: Number,
        required: [true, 'debe poner un nit']
    },
    propietario:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    street:{
        type: String,
        required: [true, 'debe poner una direcion']
    },
    telephone: {
        type: Number,
        required: [true, 'debe poner un telefono']
    },
    registerdate: Date,
    Log: String,
    Lat: String,
    //Logo: String,*/
    fotolugar:String
};
const REST= mongoose.model('restaurante', rest);
module.exports = {REST, keys: ['name', 'propietario', 'street','telephone']};
//module.exports = REST;

