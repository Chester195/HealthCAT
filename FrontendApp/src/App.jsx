import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Historial from './pages/Historial';
import Alertas from './pages/Alertas';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Registro from './pages/Registro';

import './styles/navbar.css';
import './styles/home.css';
import './styles/cardMetric.css';
import './styles/index.css';

function AppWrapper() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registro';

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: 'white' }}>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
