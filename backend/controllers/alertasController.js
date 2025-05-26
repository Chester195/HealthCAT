const db = require('../db/connection');

// 🔍 Obtener alertas por correo
async function obtenerAlertasPorCorreo(req, res) {
  try {
    const correo = req.params.correo;

    // Paso 1: Buscar ID del usuario a partir del correo
    const [usuarioRows] = await db.execute(
      'SELECT id FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (usuarioRows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const userId = usuarioRows[0].id;

    // Paso 2: Consultar alertas asociadas a ese usuario
    const [alertas] = await db.execute(
      'SELECT tipo_alerta, valor_limite, fecha_creacion FROM Alertas WHERE id_usuario = ? ORDER BY fecha_creacion DESC',
      [userId]
    );

    res.json(alertas);
  } catch (err) {
    console.error('❌ Error al obtener alertas:', err.message);
    res.status(500).json({ error: 'Error al obtener alertas' });
  }
}

module.exports = { obtenerAlertasPorCorreo };
