import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/perfil.css';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [salud, setSalud] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const correo = localStorage.getItem('correo');
    if (!correo) return;

    axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios/dashboard/${correo}`)
      .then(res => {
        const { usuario, salud } = res.data;
        setUsuario(usuario);
        setSalud(salud);
        setForm({ ...usuario, ...salud });
      })
      .catch(err => {
        console.error('❌ Error al obtener perfil:', err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    const correo = localStorage.getItem('correo');
    if (!correo) {
      alert('❌ No se encontró el correo del usuario.');
      return;
    }

    const datosAEnviar = {
      ...form,
      genero: (form.genero || '').trim(),
      fecha_nacimiento: form.fecha_nacimiento?.split('T')[0] || ''
    };

    axios.put(`${import.meta.env.VITE_API_URL}/api/usuarios/perfil/${encodeURIComponent(correo)}`, datosAEnviar)
      .then(() => {
        alert('✅ Datos actualizados correctamente');
        setEditando(false);
      })
      .catch((error) => {
        console.error('❌ Error al actualizar perfil:', error);
        alert('❌ Ocurrió un error al guardar los cambios');
      });
  };

  const handleExportar = () => {
    const correo = localStorage.getItem('correo');
    if (!correo) return alert('No hay correo guardado');

    const link = document.createElement('a');
    link.href = `${import.meta.env.VITE_API_URL}/api/exportar/${correo}`;
    link.target = '_blank';
    link.click();
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <h1>Mi perfil</h1>
      <div className="perfil-card">
        <h3>Datos personales</h3>

        <p><strong>Nombre:</strong>&nbsp;
          {editando
            ? <input type="text" name="nombre" value={form.nombre || ''} onChange={handleChange} />
            : <span>{usuario.nombre}</span>}
        </p>

        <p><strong>Correo:</strong>&nbsp;<span>{usuario.correo}</span></p>

        <p><strong>Fecha de nacimiento:</strong>&nbsp;
          {editando
            ? <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento?.split('T')[0] || ''} onChange={handleChange} />
            : <span>{usuario.fecha_nacimiento}</span>}
        </p>

        <h3>Datos de salud</h3>

        <p><strong>Peso:</strong>&nbsp;
          {editando
            ? <input type="number" name="peso" value={form.peso || ''} onChange={handleChange} />
            : <span>{salud?.peso ?? ''}</span>}
        </p>

        <p><strong>Altura:</strong>&nbsp;
          {editando
            ? <input type="number" name="altura" value={form.altura || ''} onChange={handleChange} />
            : <span>{salud?.altura ?? ''}</span>}
        </p>

        <p><strong>Tipo de sangre:</strong>&nbsp;
          {editando
            ? <input type="text" name="tipo_sangre" value={form.tipo_sangre || ''} onChange={handleChange} />
            : <span>{salud?.tipo_sangre ?? '--'}</span>}
        </p>

        <p><strong>Género:</strong>&nbsp;
          {editando ? (
            <select name="genero" value={form.genero || ''} onChange={handleChange}>
              <option value="">Selecciona</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          ) : <span>{salud?.genero ?? '--'}</span>}
        </p>

        <p><strong>Alergias:</strong>&nbsp;
          {editando
            ? <input type="text" name="alergias" value={form.alergias || ''} onChange={handleChange} />
            : <span>{salud?.alergias ?? '--'}</span>}
        </p>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          {!editando
            ? <button onClick={() => setEditando(true)}>Actualizar datos</button>
            : <button onClick={handleGuardar}>Guardar cambios</button>}
          <button onClick={handleExportar} className="btn-exportar">Exportar datos</button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
