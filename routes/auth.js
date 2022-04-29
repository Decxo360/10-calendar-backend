const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const validarCampos = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

// router.get('/',(req,res)=>{
//     res.json({
//         ok:true
//     })
// })

router.post(
    '/',
    [
        check('mail', 'El email no es valido').isEmail(),
        check('password', 'La contraseña no contiene mas de 8 caracteres').isLength({ min: 8 }),
        validarCampos
    ]
    ,loginUsuario
);

router.post('/register',    
    [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('mail', 'El email no es valido').isEmail(),
    check('password', 'La contraseña no contiene mas de 8 caracteres').isLength({ min: 8 }),
    validarCampos
    ]
    , crearUsuario);
    
router.get('/renew', validarJWT ,revalidarToken);


module.exports = router;