# 🩺 HealthCAT – Sistema de Monitoreo de Salud en Tiempo Real

**HealthCAT** es una aplicación full stack que permite visualizar, registrar y analizar datos biométricos (ritmo cardíaco y SpO₂) obtenidos en tiempo real desde un sensor físico conectado a un ESP8266. Es ideal para monitoreo clínico remoto, bienestar personal o entornos educativos.

---

## 🚀 Tecnologías utilizadas

### 🔧 Backend
- **Node.js + Express** – API REST segura con certificados SSL.
- **MySQL (Clever Cloud)** – Base de datos relacional para usuarios, datos de salud, historial y alertas.
- **MQTT (Mosquitto Broker)** – Comunicación en tiempo real entre el sensor físico y el backend.
- **jsPDF** – Generación de reportes PDF descargables desde el perfil.

### 🌐 Frontend
- **React.js + Vite** – Interfaz SPA moderna y rápida.
- **Axios** – Comunicación con la API.
- **Chart.js** – Visualización de gráficas de historial.
- **Bootstrap + CSS personalizado** – Diseño responsive y accesible.

### 🧠 Hardware
- **ESP8266**
- **Sensor MAX30102** – Medición de ritmo cardíaco y oxigenación en sangre.

---

## 📌 Funcionalidades principales

✅ Registro e inicio de sesión de usuarios  
✅ Edición de datos personales y de salud  
✅ Visualización en tiempo real de BPM y SpO₂  
✅ Historial detallado de las últimas mediciones  
✅ Gráfica de tendencias de salud  
✅ Alertas automáticas por BPM fuera de rango o estabilidad  
✅ Exportación de reporte PDF completo desde el perfil  

---

## 🗂️ Estructura del proyecto

