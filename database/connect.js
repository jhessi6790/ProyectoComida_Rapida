const moogose= require('mongoose');
moogose.Mongoose.connect('mogodb://172.18.0.2:27017//comidarapida');
module.exports=moogose;