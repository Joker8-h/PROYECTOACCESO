const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req,res,next){
    //extraer la cabecera de autorizacion
    const header = req.headers['authorization'];
    if (!header){
        return res.json({mensaje:"No se encontro el token en la cabecera de autorizacion"});
    }
    // el formato esperado es "Bearer <token>"
    const token = header.split(' ')[1];

    // verificar token
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if (err){
            return res.json({mensaje:"token invalido"});


        }
        // Token Válido: Adjuntar el payload decodificado al objeto de solicitud
        // Esto permite acceder a req.user.id o req.user.email en las rutas protegidas.
            req.user = decoded;
            //Continuar con el siguiente controlador/middleware
            next();
        
    });
    
    
}
module.exports = verificarToken;