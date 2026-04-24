const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/controllersUsuario');
const produtoController = require('../controllers/controllersProdutos');
const pedidoController = require('../controllers/controllersPedidos');

router.get('/usuarios', usuarioController.listar);
router.get('/usuarios/:id', usuarioController.buscarPorId)
router.post('/usuarios', usuarioController.criar);
router.put('/usuarios/:id', usuarioController.atualizar);
router.delete('/usuarios/:id', usuarioController.deletar);

router.get('/produtos', produtoController.listar);
router.get('/produtos/:id', produtoController.buscarPorId)
router.post('/produtos', produtoController.criar);
router.put('/produtos/:id', produtoController.atualizar);
router.delete('/produtos/:id', produtoController.deletar);

router.get('/pedidos', pedidoController.listar);
router.get('/pedidos/:id', pedidoController.buscarPorId)
router.post('/pedidos', pedidoController.criar);
router.put('/pedidos/:id', pedidoController.atualizar);
router.delete('/pedidos/:id', pedidoController.deletar);

module.exports = router;