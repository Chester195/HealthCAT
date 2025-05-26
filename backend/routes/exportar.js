const express = require('express');
const router = express.Router();
const { exportarPerfilPDF } = require('../controllers/exportarController');

router.get('/:correo', exportarPerfilPDF);

module.exports = router;
