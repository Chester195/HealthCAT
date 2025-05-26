import React, { useEffect, useState } from 'react';
import '../styles/alertas.css';
import axios from 'axios';

function Alertas() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const correo = localStorage.getItem('correo');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/alertas/${correo}`);
        setAlertas(res.data);
      } catch (error) {
        console.error('❌ Error al obtener alertas:', error.message);
      }
    };

    fetchAlertas();
  }, []);

  return (
    <div className="alertas-container">
      <h1>Alertas de Salud</h1>

      <table className="tabla-alertas">
        <thead>
          <tr>
            <th>Tipo de Alerta</th>
            <th>Valor Límite</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map((alerta, i) => (
            <tr key={i}>
              <td>{alerta.tipo_alerta}</td>
              <td>{alerta.valor_limite}</td>
              <td>{new Date(alerta.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Alertas;
