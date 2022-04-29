const { Router } = require('express');
const { check } = require('express-validator');
const { crearEvento, obtenerEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// ruta /api/events
router.use(validarJWT);

router.get('/'
, obtenerEvento);
router.post('/',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').isDate(),
    check('end','Fecha de termino es obligatoria').isDate(),
    validarCampos,
],crearEvento);
router.put('/:id',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').isDate(),
    check('end','Fecha de termino es obligatoria').isDate(),
    validarCampos,
]
,actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router