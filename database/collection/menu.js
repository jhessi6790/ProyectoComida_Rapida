const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var menusSchema = new Schema({
  name : String,
  precio : Number,
  description : String,
  registerdate : Date,
  picture: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurant"
  }  
  
});
var MENU = mongoose.model("menu", menusSchema);
module.exports = MENU;
