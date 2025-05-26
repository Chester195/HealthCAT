const db = require('../db/connection');

// Última medición general
const obtenerUltimoDato = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT ritmo_cardiaco, spo2, fecha_registro 
      FROM DatosBiometricos 
      ORDER BY fecha_registro DESC 
      LIMIT 1
    `);
    if (rows.length === 0) return res.status(404).json({ error: 'No hay datos registrados aún' });
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Error en obtenerUltimoDato:', error.message);
    res.status(500).json({ error: 'Error interno al obtener el dato biométrico' });
  }
};

// Última medición por usuario
const obtenerUltimoDatoPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT ritmo_cardiaco, spo2, fecha_registro 
       FROM DatosBiometricos 
       WHERE id_usuario = ? 
       ORDER BY fecha_registro DESC 
       LIMIT 1`,
      [id_usuario]
    );
    if (rows.length === 0) return res.status(404).json({ mensaje: 'No hay datos biométricos' });
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Error al obtener el último dato biométrico:', error.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Historial de los últimos 50 registros
const obtenerHistorialPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT ritmo_cardiaco, spo2, fecha_registro
       FROM DatosBiometricos
       WHERE id_usuario = ?
       ORDER BY fecha_registro DESC
       LIMIT 50`,
      [id_usuario]
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Error al obtener historial:', err.message);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

module.exports = {
  obtenerUltimoDato,
  obtenerUltimoDatoPorUsuario,
  obtenerHistorialPorUsuario
};
