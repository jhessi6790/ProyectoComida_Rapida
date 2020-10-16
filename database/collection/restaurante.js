const mongoose = require('../connect');
var mon = require('mongoose');
var Schema = mon.Schema;
const rest={
    name: String, 
    nit: Number,
    propietario:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    street: String,
    telephone: Number,
    registerdate: Date,
    Log: String,
    Lat: String,
    Logo: String,
    fotolugar:String
};
const REST= mongoose.model('restaurante', rest);
module.exports = {REST, keys: ['name', 'propietario', 'street','telephone']};
//module.exports = REST;

