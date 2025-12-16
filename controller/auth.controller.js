
const authService = require('../service/auth.service');
const authController = {
  async register(req, res) {
    try {
      const usuarionuevo = await authService.register(req.body);
      res.json({ mensaje: "Usuario registrado", usuarionuevo });
    } catch (error) {
      res.json({ mensaje: "Error al registrar", error });
    }
  },

  /**
   * controlador para el login.recibe  credenciales y devuelve token
   */
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ mensaje: 'Falta el email o la contraseña' });

    }
    try {
      //llamar al servicio de login
      const resultado = await authService.login(req.body);
      if (!resultado) {
        return res.json({ mensaje: "Usuario no encontrado o credenciales incorrectas" });

      } else {
        return res.json({
          mensaje: "Login exitoso",
          usuario: resultado.user,
          token: resultado.token,//devolver token
        });
      }

    } catch (error) {
      res.json({ mensaje: "Error al login", error });
    }
  }


};
module.exports = authController;