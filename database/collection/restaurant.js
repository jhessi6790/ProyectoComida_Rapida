const mongoose = require('../connect');
const REST={
    name: String, 
    nit: Number,
    propietario: String,
    street: String,
    telephone: Number,
    registerdate: Date
    /* Log, Lat, Logo,fotolugar*/
};
const restmodel= mongoose.model('restaurant', REST);
module.exports = restmodel;

