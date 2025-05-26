// routes/alertas.js
const express = require('express');
const router = express.Router();
const { obtenerAlertasPorCorreo } = require('../controllers/alertasController');

router.get('/:correo', obtenerAlertasPorCorreo);

module.exports = router;
