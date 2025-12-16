const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');//importar jwt

const JWT_SECRET = process.env.JWT_SECRET;//importar clave secreta
const TOKEN_EXPIRA = process.env.TOKEN_EXPIRA;//importar tiempo de expiracion



const authService = {
  async register(data) {
    const { nombre, email, password } = data;
    //encriptar password
    const datoencriptado = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: datoencriptado,
      },
      // no devolver el password en la respuesta
      select: {
        id: true, nombre: true, email: true,
      },

    });



    return usuario;


  },
  /**
   * @description verifica credenciales de usuario y genera un jwt
   * @param {string} email - email del usuario
   * @param {string} password - contraseña en texto plano
   * @returns {object/null} objeto con 'user' y 'token' o null si el usuario no existe
   */



  async login(data) {//implemetacion de la funcion login
    const { email, password } = data;
    //buscar usuario
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return null;//si no existe el usuario
    }
    //comparar contarseña hasheada
    const passwordesvalida = await bcrypt.compare(password, usuario.password);
    if (!passwordesvalida) {
      return null;//si la contraseña no es correcta
    }
    //defenir payload
    const payload = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
    };
    //firmar token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRA });

    // DEVOLVER USUARIO (SIN CONTRASEÑA) Y TOKEN
    const { password: _, ...usarioconpassword } = usuario;

    return { user: usarioconpassword, token: token };

  },

}
module.exports = authService;