const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var menusSchema = new Schema({
  name : {
    type: String,
    required: [true, 'debe poner un nombre']
  },
  precio : {
    type: Number,
    required: [true, 'debe poner el precio']
  },
  description : {
    type: String,
    required: [true, 'debe poner la descripcion']
  },
  registerdate : Date,
  /*picture: String,
  restaurant:{
    type: Schema.Types.ObjectId,
    ref: "restaurante",
    required: [true, 'debe poner el id del  reataurant']
  } */ 
});
var MENU = mongoose.model('menu', menusSchema);
module.exports = MENU;
