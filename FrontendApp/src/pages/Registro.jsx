import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    fecha_nacimiento: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, correo, contrasena, fecha_nacimiento } = formData;

    if (!nombre || !apellido || !correo || !contrasena || !fecha_nacimiento) {
      alert('⚠️ Por favor completa todos los campos antes de continuar.');
      return;
    }

    try {
      await axios.post('https://localhost:3000/api/usuarios/registrar', formData);
      console.log('Correo que se guardará:', formData.correo);
      localStorage.setItem('correo', formData.correo);
      alert('✅ Cuenta creada correctamente');
      navigate('/login');
    } catch (error) {
      console.error('❌ Error completo:', error);

      if (error.response) {
        console.error('📦 Respuesta del backend:', error.response.data);
        console.error('🔢 Código:', error.response.status);

        if (error.response.status === 409) {
          alert('❌ El correo ya está registrado');
        } else {
          alert('❌ Error al registrar usuario');
        }
      } else {
        console.error('🧱 Error sin respuesta del servidor:', error.message);
        alert('❌ No se pudo conectar al servidor');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
