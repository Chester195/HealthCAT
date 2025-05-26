const db = require('../db/connection');
const bcrypt = require('bcrypt');

const registrarUsuario = async (req, res) => {
  const { nombre, apellido, correo, contrasena, fecha_nacimiento } = req.body;
  const fecha_registro = new Date();

  console.log('📦 Datos recibidos en registro:', req.body); // ← ¡Aquí!

  try {
    const [existente] = await db.execute('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (existente.length > 0) {
      return res.status(409).json({ error: 'Correo ya registrado' });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const query = `
      INSERT INTO usuarios (nombre, apellido, correo, contrasena, fecha_nacimiento, fecha_registro)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.execute(query, [nombre, apellido, correo, hash, fecha_nacimiento, fecha_registro]);

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });

  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message); // ← Mostrar solo el mensaje
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const obtenerSaludPorCorreo = async (req, res) => {
  const { correo } = req.params;

  try {
    console.log('🔍 Buscando salud para:', correo);

    // Paso 1: Obtener ID del usuario
    const [usuarios] = await db.execute('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (usuarios.length === 0) {
      console.warn('❌ Usuario no encontrado para el correo:', correo);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const id_usuario = usuarios[0].id;

    // Paso 2: Obtener datos de salud
    const [salud] = await db.execute(
      'SELECT peso, altura, tipo_sangre, genero, alergias FROM DatosSalud WHERE id_usuario = ?',
      [id_usuario]
    );

    if (salud.length === 0) {
      console.warn('⚠️ No hay datos de salud para el usuario con ID:', id_usuario);
      return res.status(404).json({ error: 'No hay datos de salud registrados' });
    }

    console.log('✅ Datos de salud encontrados:', salud[0]);
    res.json(salud[0]);

  } catch (error) {
    console.error('🔥 Error al obtener datos de salud:', error.message);
    res.status(500).json({ error: 'Error interno del servidor al obtener datos de salud' });
  }
};



const obtenerUsuarioPorCorreo = async (req, res) => {
  const { correo } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT nombre, apellido, correo, fecha_nacimiento FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


const actualizarPerfilCompleto = async (req, res) => {
  const { correo } = req.params;
  const {
    nombre, apellido, fecha_nacimiento,
    peso, altura, tipo_sangre, genero, alergias
  } = req.body;

  try {
    // Buscar ID del usuario
    const [usuarios] = await db.execute('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const id_usuario = usuarios[0].id;

    // Actualizar tabla usuarios
    await db.execute(
      'UPDATE usuarios SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id = ?',
      [nombre, apellido, fecha_nacimiento, id_usuario]
    );

    // Verificar si el usuario ya tiene datos de salud
    const [salud] = await db.execute('SELECT IDsalud FROM DatosSalud WHERE id_usuario = ?', [id_usuario]);

    if (salud.length > 0) {
      // Actualizar si existen
      await db.execute(
        'UPDATE DatosSalud SET peso = ?, altura = ?, tipo_sangre = ?, genero = ?, alergias = ? WHERE id_usuario = ?',
        [peso, altura, tipo_sangre, genero, alergias, id_usuario]
      );
    } else {
      // Insertar si no existen
      await db.execute(
        'INSERT INTO DatosSalud (id_usuario, peso, altura, tipo_sangre, genero, alergias) VALUES (?, ?, ?, ?, ?, ?)',
        [id_usuario, peso, altura, tipo_sangre, genero, alergias]
      );
    }

    res.status(200).json({ mensaje: 'Perfil actualizado correctamente' });

  } catch (error) {
    console.error('❌ Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error del servidor al actualizar perfil' });
  }

};



const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [usuarios] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Correo no registrado' });
    }

    const usuario = usuarios[0];
    console.log('📥 Datos recibidos:', correo, contrasena);
    console.log('🔑 Contraseña guardada en BD:', usuario.contrasena);
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log('✅ Coinciden las contraseñas?', coincide);


    if (!coincide) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // En este punto todo es válido
    res.status(200).json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const obtenerDashboard = async (req, res) => {
  const { correo } = req.params;

  try {
    const [usuarios] = await db.execute('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (usuarios.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const id_usuario = usuarios[0].id;

    const [biometrico] = await db.execute(
      'SELECT ritmo_cardiaco, spo2 FROM DatosBiometricos WHERE id_usuario = ? ORDER BY fecha DESC LIMIT 1',
      [id_usuario]
    );

    res.json({ biometrico: biometrico[0] || null });
  } catch (error) {
    console.error('❌ Error en dashboard:', error.message);
    res.status(500).json({ error: 'Error al obtener datos del dashboard' });
  }
};


const obtenerIdUsuarioPorCorreo = async (req, res) => {
  const { correo } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT id FROM usuarios WHERE correo = ?',
      [correo]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ id: rows[0].id });
  } catch (error) {
    console.error('❌ Error al obtener ID del usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  registrarUsuario,
  obtenerUsuarioPorCorreo,
  actualizarPerfilCompleto,
  loginUsuario,
  obtenerSaludPorCorreo,
  obtenerUsuarioPorCorreo,
  obtenerIdUsuarioPorCorreo,
  obtenerDashboard
};
