const mqtt = require('mqtt');
const db = require('./db/connection');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('📡 Conectado al broker MQTT');
  client.subscribe('sensor/biometrico', (err) => {
    if (!err) {
      console.log('🟢 Suscrito a sensor/biometrico');
    } else {
      console.error('❌ Error al suscribirse:', err);
    }
  });
});

client.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const { id_usuario, bpm, spo2 } = data;

    console.log(`📥 Recibido | Usuario: ${id_usuario} | BPM: ${bpm} | SpO2: ${spo2}`);

    const query = `
      INSERT INTO DatosBiometricos (id_usuario, ritmo_cardiaco, spo2, fecha_registro)
      VALUES (?, ?, ?, NOW())
    `;

    await db.execute(query, [id_usuario, bpm, spo2]);
    console.log('✅ Guardado en base de datos con fecha');

    await evaluarAlerta(bpm, id_usuario);
  } catch (err) {
    console.error('❌ Error al procesar mensaje MQTT:', err.message);
  }
});

async function evaluarAlerta(bpm, userId) {
  try {
    if (bpm < 60 || bpm > 100) {
      await db.execute(`
        INSERT INTO Alertas (id_usuario, tipo_alerta, valor_limite, fecha)
        VALUES (?, ?, ?, NOW())
      `, [userId, 'Ritmo fuera de rango', bpm]);
      console.log('🚨 Alerta registrada por BPM fuera de rango');
    } else {
      const [rows] = await db.execute(`
        SELECT ritmo_cardiaco FROM DatosBiometricos
        WHERE id_usuario = ? ORDER BY fecha_registro DESC LIMIT 10
      `, [userId]);

      if (rows.length === 10 && rows.every(r => r.ritmo_cardiaco >= 60 && r.ritmo_cardiaco <= 100)) {
        await db.execute(`
          INSERT INTO Alertas (id_usuario, tipo_alerta, valor_limite, fecha)
          VALUES (?, ?, ?, NOW())
        `, [userId, 'Estado estable (10 mediciones normales)', bpm]);
        console.log('✅ Alerta registrada por estabilidad');
      }
    }
  } catch (err) {
    console.error('❌ Error al evaluar alerta:', err.message);
  }
}
