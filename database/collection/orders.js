const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var ordersSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  lugarEnvio: [Number],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurant"
   },

  menus: [{
    type: Schema.Types.ObjectId,
    ref: "menus"
  }],
  cantidad: [Number],
  fechaRegistro: {
    type: Date,
    default: Date.now()
  },
  pagoTotal: Number
  
});
var order = mongoose.model("orders", ordersSchema);
module.exports = order;
