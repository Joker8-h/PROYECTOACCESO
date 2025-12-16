const express = require('express');
const router = express.Router();
const verfificacion = require('../Middleware/Auth.middleware');
const authController = require('../controller/auth.controller');

//ruta para registro
router.post('/registro', authController.register); 
//ruta para login trae el token
router.post('/login', authController.login); 


// ruta protejida por token
router.get('/perfil',verfificacion,async (req,res)=>{
    res.json({
        mensaje:"acceso correcto",
        datos:req.user
        
    }
    )
})


module.exports = router;

