const mongoose = require('../connect');
const rest={
    name: String, 
    nit: Number,
    propietario: String,
    street: String,
    telephone: Number,
    registerdate: Date,
    Log: String,
    Lat: String,
    Logo: String,
    fotolugar:String
};
const REST= mongoose.model('restaurant', rest);
module.exports = {REST, keys: ['name', 'propietario', 'street','telephone']};
//module.exports = REST;

