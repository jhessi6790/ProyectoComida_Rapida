const mongoose = require('../connect');
const rest={
    name: String, 
    nit: Number,
    propietario: String,
    street: String,
    telephone: Number,
    registerdate: Date
    /* Log, Lat, Logo,fotolugar*/
};
const REST= mongoose.model('restaurant', rest);
module.exports = {REST, keys: ['name', 'propietario', 'street','telephone']};
//module.exports = REST;

