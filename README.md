# 🩺 HealthCAT — IoT Health Monitoring System

HealthCAT is a full-stack IoT-based health monitoring prototype developed as a collaborative academic project at Universidad Autónoma de Guadalajara.

The project explores the integration of embedded hardware, wireless communication, backend services, relational databases, and web technologies to collect and manage biometric information.

Using an **ESP8266 microcontroller** and a **MAX30102 sensor**, the system detects heartbeats, calculates heart rate (BPM), and transmits measurements through MQTT for integration with a web-based monitoring application.

## 🛠️ Tech Stack

### Frontend
- **React.js + Vite** — Web application development
- **JavaScript, HTML, CSS** — User interface
- **Bootstrap** — Responsive design
- **Axios** — HTTP communication

### Backend
- **Node.js + Express.js** — REST API
- **MySQL** — Relational database
- **MQTT (Mosquitto)** — IoT messaging infrastructure

### Hardware & Embedded Development
- **ESP8266** — Wi-Fi-enabled microcontroller
- **MAX30102** — Optical heart rate sensor
- **Arduino IDE / C++** — Firmware development
- **I²C** — Sensor communication
- **ArduinoJson** — JSON message serialization
- **PubSubClient** — MQTT communication

## ✨ Key Features

- **Heart Rate Monitoring:** Detects heartbeats and calculates BPM using the MAX30102 sensor.
- **Wireless Data Transmission:** Publishes biometric measurements as JSON messages through MQTT.
- **Measurement Processing:** Calculates an average from six valid BPM readings before transmission.
- **REST API:** Provides endpoints for registering and retrieving biometric measurements.
- **Database Integration:** Uses MySQL for biometric data storage.
- **Web Interface:** Includes React-based pages for monitoring, user profiles, biometric history, and alerts.
- **Modular Architecture:** Separates embedded firmware, backend services, and frontend components.

## 🏗️ System Architecture

HealthCAT is organized into three main components:

### 1. IoT Device

The ESP8266 communicates with the MAX30102 sensor through I²C.

The firmware:
- Connects to a Wi-Fi network.
- Detects heartbeats using infrared sensor readings.
- Calculates BPM based on the time between detected beats.
- Averages six valid measurements.
- Publishes the results as JSON messages to an MQTT broker.

### 2. Backend

The Node.js and Express backend provides REST endpoints for handling biometric measurements and integrates with a MySQL database.

The IoT firmware publishes measurements to the MQTT topic `sensor/biometrico`.

### 3. Frontend

The React application provides a web interface with pages for biometric monitoring, user profiles, history, and alerts.

### Communication Overview

```text
MAX30102 Sensor
      |
      | I2C
      v
ESP8266 (Arduino / C++)
      |
      | Wi-Fi / MQTT
      v
Mosquitto MQTT Broker

Node.js / Express REST API
      |
      v
MySQL Database

React + Vite Web Application
```

The MQTT publisher, REST API, database integration, and React interface are included as components of the academic prototype. The complete MQTT-to-database processing pipeline is not included in the currently available backend source.

## 📁 Project Structure

```text
HealthCAT/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   └── server.js
│
├── FrontendApp/
│   └── src/
│       ├── components/
│       └── pages/
│
└── firmware/
    └── healthcat_esp8266.ino
```

*The firmware directory represents the suggested organization for including the Arduino source code in the repository.*

## 👥 Team & Contributions

HealthCAT was developed as a collaborative academic project.

### My Contributions — Software Development & IoT Integration

I was primarily responsible for the software implementation and hardware integration, including:

- Developing the React frontend and Node.js backend functionality.
- Programming the ESP8266 microcontroller using Arduino IDE and C++.
- Integrating the MAX30102 sensor for heartbeat detection and BPM calculation.
- Implementing MQTT-based transmission of biometric measurements.
- Developing REST API functionality for biometric data management.
- Integrating the application's software and hardware components.

### Other Team Contributions

- **Database Development:** A team member was responsible for the database design and implementation.
- **Academic Documentation:** Another team member handled academic reports and project documentation.

## 🎯 Learning Outcomes

This project provided practical experience in:

- Full-stack application development.
- RESTful API implementation.
- Embedded programming with C++.
- Hardware-software integration.
- MQTT-based communication.
- JSON data serialization.
- Relational database integration.
- Collaborative software development.

## ⚠️ Limitations & Disclaimer

- HealthCAT was developed as an academic prototype, not a production-ready application.
- The available ESP8266 firmware calculates heart rate (BPM). Although the MAX30102 supports optical measurements used in SpO₂ estimation, SpO₂ calculation is not implemented in this firmware version.
- Some web interface features use demonstration data.
- The project has not been validated for clinical use.

**HealthCAT is not a certified medical device and should not be used for medical diagnosis, treatment, or clinical decision-making.**

## 👨‍💻 Developer

**Christian Ojeda**  
Software Engineering Student  
Universidad Autónoma de Guadalajara

**GitHub:** [@Chester195](https://github.com/Chester195)
