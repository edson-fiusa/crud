const express = require('express')
const router = express.Router()
const pedidoController = require('../controllers/controllersPedidos')


router.get('/pedidos', pedidoController.listar)
router.post('/pedidos', pedidoController.criar)
router.put('/pedidos/:id', pedidoController.atualizar)
router.delete('/pedidos/:id', pedidoController.deletar)

module.exports = router