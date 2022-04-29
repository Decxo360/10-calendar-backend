const express =  require('express')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// request = req, response = res

const crearUsuario = async(req,res = express.response)=>{

    const {mail, password} = req.body;

    try{ 
        let usuario = await Usuario.findOne({mail});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario.save();
        
        const token = await generarJWT(usuario.id, usuario.name);
        
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        });
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }

    //manejo de erres
    
}
const loginUsuario = async(req,res = express.response)=>{
    const {mail,password} = req.body
    try{
        const usuario = await Usuario.findOne({mail});
        if(!usuario){
            return res.status(400).json({
                ok:'false',
                msg:'Usuario y contraseña no son correctos'
            })
        }
        const validPass = bcrypt.compareSync(password, usuario.password)
        if(!validPass){
            return res.status(400).json({
                ok:'false',
                msg:'Usuario y contraseña no son correctos'
            })
        }
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }
}
const revalidarToken = async(req,res = express.response)=>{

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name)
    

    res.json({
        ok:true,
        msg:'Revalidar token',
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}