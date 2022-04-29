const express = require('express')
const Evento = require('../models/Evento')


const crearEvento = async (req, res = express.response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid
        const eventoGuarado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuarado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const eliminarEvento = async(req, res = express.response) => {

    const eventoId = req.params.id;
    const uid =req.uid;
  try{
    const event = await Evento.findById(eventoId)
    if(!event){
       return res.status(404).json({
            ok:false,
            msg:'evento no existe por ese id'
        })
    }
    if(event.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg:'No tiene privilegio de editar este evento'
        })
    }
    
    await Evento.findByIdAndDelete(eventoId);

    res.json({
        ok:true,
        msg:'Evento eliminado',
        user:event.user.toString()
    })

  }catch(err){
    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
  }

}
const actualizarEvento = async(req, res = express.response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try{

        const evento = await Evento.findById(eventoId);
        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento={
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento,{new:true});

        res.json({
            ok:true,
            evento:eventoActualizado
        })


    }catch(err){
        res.status(500).json({
            ok:false,
            msg:'Hbale con el adminsitrador'
        })
    }


    res.json({
        ok: true,
        msg: 'Evento actualizado con exito'
    })

}
const obtenerEvento = async (req, res = express.response) => {


    const eventos = await Evento.find()
                                .populate('user','name');
    res.json({
        ok: true,
        eventos,
        msg: 'Evento Obtenidp con exito'
    })

}

module.exports = {
    crearEvento,
    eliminarEvento,
    actualizarEvento,
    obtenerEvento
}