const {Schema,model} = require('mongoose')

const UsuarioSchema = Schema({

    name:{
        type: String,
        requiered: true
    },
    mail:{
        type: String,
        requiered: true,
        unique: true
    },
    password:{
        type: String,
        requiered: true
    }

})

module.exports = model('Usuario', UsuarioSchema);
