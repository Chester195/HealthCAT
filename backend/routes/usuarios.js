const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  obtenerUsuarioPorCorreo,
  actualizarPerfilCompleto,
  loginUsuario,
  obtenerSaludPorCorreo,
  obtenerIdUsuarioPorCorreo
} = require('../controllers/usuariosController');

const db = require('../db/connection');

// 📦 Registro
router.post('/registrar', registrarUsuario);

// 🔐 Login
router.post('/login', loginUsuario);

// 👤 Obtener perfil
router.get('/:correo', obtenerUsuarioPorCorreo);

// 🩺 Obtener datos de salud
router.get('/salud/:correo', obtenerSaludPorCorreo);

// 🔄 Actualizar perfil completo (personal + salud)
router.put('/perfil/:correo', actualizarPerfilCompleto);

// 🔍 Obtener ID por correo
router.get('/id/:correo', obtenerIdUsuarioPorCorreo);

// ✅ Ruta optimizada para Home y Perfil
router.get('/dashboard/:correo', async (req, res) => {
  const { correo } = req.params;

  try {
    const [[usuario]] = await db.execute(
      'SELECT id, nombre, apellido, correo, fecha_nacimiento FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const [[biometrico]] = await db.execute(
      'SELECT ritmo_cardiaco, spo2 FROM DatosBiometricos WHERE id_usuario = ? ORDER BY fecha_registro DESC LIMIT 1',
      [usuario.id]
    );

    const [[salud]] = await db.execute(
      'SELECT peso, altura, tipo_sangre, genero, alergias FROM DatosSalud WHERE id_usuario = ?',
      [usuario.id]
    );

    res.json({ usuario, biometrico, salud });

  } catch (err) {
    console.error('❌ Error en dashboard:', err.message);
    res.status(500).json({ error: 'Error al obtener dashboard' });
  }
});

const { obtenerDashboard } = require('../controllers/usuariosController');

router.get('/dashboard/:correo', obtenerDashboard);


module.exports = router;
