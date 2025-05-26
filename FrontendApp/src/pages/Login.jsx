import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('https://localhost:3000/api/usuarios/login', {
      correo,
      contrasena,
    });

    alert('✅ Login exitoso');
    localStorage.setItem('correo', res.data.usuario.correo);
    navigate('/perfil');

  } catch (error) {
    console.error('🛑 Error completo al hacer login:', error);
    if (error.response?.status === 401) {
      alert(`❌ ${error.response.data.error}`);
    } else {
      alert('❌ Error al intentar iniciar sesión');
    }
  }
};


  

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        ¿No tienes cuenta?{' '}
        <button
          type="button"
          onClick={() => navigate('/registro')}
          style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Crear cuenta
        </button>
      </p>
    </div>
  );
}



export default Login;
