const mongoose= require('mongoose');
//const databasename = "comidarapida";
mongoose.connect('mongodb://172.18.0.2:27017/comidarapida');
module.exports=mongoose;