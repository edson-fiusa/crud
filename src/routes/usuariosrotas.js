const express = require('express')
const router = express.Router()

const usuarioController = require('../controllers/controllersUsuario.js')

router.post('/usuario', usuarioController.criar);
router.get('/usuario', usuarioController.listar)
router.put('/usuario/:id', usuarioController.atualizar)
router.delete('/usuario/:id', usuarioController.deletar)

module.exports = router