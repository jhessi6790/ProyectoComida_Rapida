const mongoose = require('../connect');
const Schema = mongoose.Schema;

const ordenSchema = Schema({

    cliente: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lugarEnvio: [Number],
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurante"
    },

    menus: [{
        type: Schema.Types.ObjectId,
        ref: "menu"
    }],

    cantidad: [Number],
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    pagoTotal: Number

})

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
