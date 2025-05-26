import { useEffect, useState } from 'react';
import axios from 'axios';

const useHistorial = (idUsuario) => {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idUsuario) return;

    const obtenerHistorial = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/biometrico/historial/${idUsuario}`);
        // Verifica que la respuesta sea un array
        setHistorial(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Error al obtener historial:', err.message);
        setError(err);
      }
    };

    obtenerHistorial();
  }, [idUsuario]);

  return { historial, error };
};

export default useHistorial;
