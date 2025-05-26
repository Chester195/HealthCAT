import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">HealthCAT</div>
      <ul className="navbar-links">
        <li><Link to="/home">Inicio</Link></li>
        <li><Link to="/historial">Historial</Link></li>
        <li><Link to="/alertas">Alertas</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
