import React, { useEffect, useState, useRef } from 'react';
import CardMetric from '../components/CardMetric';
import axios from 'axios';

function Home() {
  const [bpm, setBpm] = useState('--');
  const [spo2, setSpo2] = useState('--');
  const [ultimaFecha, setUltimaFecha] = useState('--');
  const idUsuarioRef = useRef(null);

  useEffect(() => {
    const obtenerIdUsuario = async () => {
      const correo = localStorage.getItem('correo');
      if (!correo) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios/id/${correo}`);
        idUsuarioRef.current = res.data.id;
        console.log('🧠 ID del usuario:', res.data.id);
      } catch (error) {
        console.error('❌ Error al obtener ID del usuario:', error.message);
      }
    };

    const cargarUltimosDatos = async () => {
      if (!idUsuarioRef.current) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/biometrico/ultimo/${idUsuarioRef.current}`);
        console.log('📥 Último dato biométrico:', res.data);

        setBpm(res.data.ritmo_cardiaco);
        setSpo2(res.data.spo2);
        setUltimaFecha(res.data.fecha_registro);
      } catch (error) {
        console.error('❌ Error al obtener datos biométricos:', error.message);
      }
    };

    const iniciar = async () => {
      await obtenerIdUsuario();
      await cargarUltimosDatos(); // Primera carga inmediata
      const intervalo = setInterval(cargarUltimosDatos, 5000); // cada 5 seg
      return () => clearInterval(intervalo);
    };

    iniciar();
  }, []);

  return (
    <div className="home-container">
      <h1>Resumen de Salud</h1>
      <p style={{ textAlign: 'center', color: 'gray', marginBottom: '1rem' }}>
        Última lectura: {ultimaFecha || '---'}
      </p>

      <div className="cards-grid">
        <CardMetric titulo="Ritmo cardíaco (BPM)" valor={bpm} color="green" />
        <CardMetric titulo="Oxigenación en sangre (SpO₂)" valor={spo2} color="orange" />
      </div>
    </div>
  );
}

export default Home;
