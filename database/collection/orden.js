const mongoose = require('../connect');
var mon = require('mongoose');
var Schema = mon.Schema;
const ordenSchema = Schema({

    cliente: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lugarEnvio: {
        lat:String,
        log: String
    }, 
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurante"
    },

    menus: [{
        type: Schema.Types.ObjectId,
        ref: "menu"
    }],

    cantidad: Number,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    pagoTotal: Number

})

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
