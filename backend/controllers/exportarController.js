const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
const db = require('../db/connection');

async function exportarPerfilPDF(req, res) {
  const correo = req.params.correo;

  try {
    const [[usuario]] = await db.execute('SELECT id, nombre, apellido, fecha_nacimiento, correo FROM usuarios WHERE correo = ?', [correo]);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const [[salud]] = await db.execute('SELECT * FROM DatosSalud WHERE id_usuario = ?', [usuario.id]);

    const [historial] = await db.execute(`
      SELECT ritmo_cardiaco, spo2, fecha_registro
      FROM DatosBiometricos
      WHERE id_usuario = ?
      ORDER BY fecha_registro DESC
      LIMIT 50
    `, [usuario.id]);

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Reporte de Salud', 105, 15, null, null, 'center');

    // Datos personales
    doc.setFontSize(12);
    doc.text(`Nombre: ${usuario.nombre} ${usuario.apellido}`, 20, 30);
    doc.text(`Correo: ${usuario.correo}`, 20, 40);
    doc.text(`Nacimiento: ${new Date(usuario.fecha_nacimiento).toLocaleDateString()}`, 20, 50);

    // Datos de salud
    doc.text(`Peso: ${salud.peso} kg`, 20, 65);
    doc.text(`Altura: ${salud.altura} cm`, 20, 75);
    doc.text(`Tipo de sangre: ${salud.tipo_sangre}`, 20, 85);
    doc.text(`Género: ${salud.genero}`, 20, 95);
    doc.text(`Alergias: ${salud.alergias}`, 20, 105);

    // Historial
    doc.setFontSize(14);
    doc.text('Historial de BPM', 20, 120);
    doc.setFontSize(10);

    let y = 130;
    historial.forEach(h => {
      doc.text(`Fecha: ${new Date(h.fecha_registro).toLocaleString()} | BPM: ${h.ritmo_cardiaco} | SpO₂: ${h.spo2}`, 20, y);
      y += 7;
    });

    // Ruta de salida
    const outputPath = path.join(__dirname, '..', 'exports', `${usuario.id}_reporte.pdf`);
    const exportDir = path.dirname(outputPath);
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

    // ✅ Solución al error: convertir el ArrayBuffer a Buffer
    const pdfData = doc.output('arraybuffer');
    fs.writeFileSync(outputPath, Buffer.from(pdfData));

    // Descargar al cliente
    res.download(outputPath, 'reporte_salud.pdf');
  } catch (error) {
    console.error("❌ Error al generar el PDF:", error);
    res.status(500).json({ error: 'Error al generar el reporte PDF' });
  }
}

module.exports = { exportarPerfilPDF };
