const mongoose = require('../connect');
const userSchema = {
  nombre: {
    type: String,
    required: [true, 'debe poner un nombre']
  },
   /*ci: {
    type: String,
    required: [true, 'Falta el CI']
  },*/
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
  password: String,
  telefono: String,
  fechaRegistro: {
    type: Date,
    default: Date.now()
  },
  tipo: String // cliente, dueño,cocinero
};
var USER = mongoose.model('user', userSchema);
module.exports = USER;
