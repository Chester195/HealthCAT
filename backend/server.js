const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// 🔐 Certificados SSL
const sslOptions = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
};

// ✅ Rutas
const usuarioRoutes = require('./routes/usuarios');
const biometricoRoutes = require('./routes/biometrico');
const alertasRoutes = require('./routes/alertas');
const exportarRoutes = require('./routes/exportar'); // ✅ <-- sube esta línea aquí

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/biometrico', biometricoRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/exportar', exportarRoutes); // ✅ y registra aquí

// 🔎 Prueba rápida
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Conexión exitosa entre frontend y backend 🎉' });
});

app.get('/', (req, res) => {
  res.send('✅ Backend Express con HTTPS funcionando');
});

// 🧪 Probar conexión a BD
const db = require('./db/connection');
db.execute('SELECT 1')
  .then(() => console.log('✅ Conexión a la base de datos verificada correctamente'))
  .catch((err) => console.error('❌ Error al conectar con la base de datos:', err.message));

// 🚀 Iniciar servidor HTTPS
const PORT = process.env.PORT || 3000;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
