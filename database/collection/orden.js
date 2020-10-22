const mongoose = require('../connect');
var mon = require('mongoose');
var Schema = mon.Schema;
const ordenSchema = Schema({
    cliente: {
        required: [true, "cliente requerido"],
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lugarEnvioLat: {
        required: [true, "lugar requerido"],
        type: Number,
        //lat:String,
        //log: String
    }, 
    lugarEnvioLog: {
        required: [true, "lugar requerido"],
        type: Number,
        //lat:String,
        //log: String
    }, 
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurante"
    },
    menus:{
        type: Schema.Types.ObjectId,
        ref: "menu",
        required: 'Menu requerido'
        //required: [true, "menu requerido"],
        //type: Schema.Types.ObjectId,
        //ref: "menu"
    } ,
    cantidad: Number,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    pagoTotal: Number

})

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
