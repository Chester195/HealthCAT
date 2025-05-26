const express = require('express');
const router = express.Router();

const { obtenerUltimoDato, obtenerUltimoDatoPorUsuario, obtenerHistorialPorUsuario } = require('../controllers/biometricoController');


router.get('/ultimo', obtenerUltimoDato);
router.get('/ultimo/:id_usuario', obtenerUltimoDatoPorUsuario);
router.get('/historial/:id_usuario', obtenerHistorialPorUsuario);


module.exports = router;
