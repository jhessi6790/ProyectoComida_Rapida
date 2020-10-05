const mongoose = require('../connect');
const clientSchema = {
  name: String,
  email:{
    type: String,
    required: [true, "email requerido"],
    validate: {
      validator: (value) => {
        return /^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(value);
      },
      message: props => `${props.value} no es correcto` 
    } 
    },
  password: {
    type: String,
    required: [true, "password requerido"],
    min: [8, "la contraseña debe tener minimo 8 caracteres"]
  },
  phone: String,
  ci: String,
  registerdate: Date,
  //role : Array
};
var CLIENT = mongoose.model('client', clientSchema);
module.exports = CLIENT;
