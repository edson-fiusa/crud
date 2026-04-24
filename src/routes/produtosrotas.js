const express = require('express')
const router = express.Router()
const produtoController = require('../controllers/controllersProdutos')

router.get('/produto', produtoController.listar)
router.post('/produto', produtoController.criar)
router.put('/produto/:id', produtoController.atualizar)
router.delete('/produto/:id', produtoController.deletar)

module.exports = router