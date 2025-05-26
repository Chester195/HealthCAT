import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./historial.css";

function Historial() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const correo = localStorage.getItem("correo");
        if (!correo) return;

        const resUsuario = await axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios/id/${correo}`);
        const id_usuario = resUsuario.data.id;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/biometrico/historial/${id_usuario}`);
        setHistorial(res.data);
      } catch (error) {
        console.error("❌ Error al obtener historial:", error.message);
      }
    };

    cargarHistorial();
  }, []);

  return (
    <div className="historial-container">
      <h2>📋 Historial de Datos Biométricos</h2>

      {/* Tabla */}
      <table className="tabla-salud">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Ritmo Cardíaco (BPM)</th>
            <th>SpO₂ (%)</th>
          </tr>
        </thead>
        <tbody>
          {historial.slice(-50).reverse().map((dato, index) => (
            <tr key={index}>
              <td>{new Date(dato.fecha_registro).toLocaleString()}</td>
              <td>{dato.ritmo_cardiaco}</td>
              <td>{dato.spo2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gráfica */}
      <h3 style={{ marginTop: "2rem" }}>📈 Tendencia de Ritmo Cardíaco y SpO₂</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historial.slice(-50)} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha_registro" tickFormatter={(str) => new Date(str).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(str) => new Date(str).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="ritmo_cardiaco" stroke="#28a745" name="BPM" />
          <Line type="monotone" dataKey="spo2" stroke="#ff7300" name="SpO₂ (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Historial;
