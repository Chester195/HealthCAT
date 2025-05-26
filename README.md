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
/backend
├── controllers/
├── db/
├── routes/
├── cert/
├── exports/
├── msqttListener.js
└── server.js

/frontend
├── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ ├── styles/
│ └── main.jsx
└── vite.config.js

---

## 📡 Arquitectura y comunicación

- El **ESP8266** envía datos al tópico `sensor/biometrico` del **broker Mosquitto**.
- El archivo `msqttListener.js` escucha esos datos, los procesa y los guarda en la base de datos.
- El **frontend en React** se comunica con la **API REST (Express)** a través de HTTPS.
- El backend también genera alertas automáticas cuando los BPM están fuera de rango o se detectan 10 mediciones normales consecutivas.
- Desde el frontend se puede solicitar un reporte PDF con todos los datos, generado con jsPDF desde el backend.


## 🛠️ Requisitos para correr el proyecto

### 📦 Backend
- Node.js 18+
- MySQL (en Clever Cloud o local)
- Mosquitto broker
- Archivo `.env` con:
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=


### 💻 Frontend

cd frontend
npm install
npm run dev

### 🧪 Comandos útiles
Iniciar backend
node server.js         # Servidor API (HTTPS)
node msqttListener.js  # Listener MQTT

### 📥 Exportar PDF
Desde la pestaña "Perfil", puedes descargar un PDF con:

Datos personales

Datos de salud

Historial de BPM y SpO₂

Gráfica del historial

Este documento es generado desde el backend utilizando jsPDF.

### 👨‍💻 Autor
Christian
Estudiante de Ingeniería en Software – Universidad Autónoma de Guadalajara
GitHub: @Chester195

### 📃 Licencia
Este proyecto es de uso académico y educativo.
Licencia MIT.



