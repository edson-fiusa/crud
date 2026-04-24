const Pedido = require('../models/pedidos/itemPedido');
const Usuario = require('../models/usuarios/usuario');
const Produto = require('../models/produtos/produtos');

module.exports = {
    async criar(req, res) {
        try {
            const { usuarioId } = req.body;
            const novoPedido = await Pedido.create({ usuarioId, valorTotal: 0 });
            res.status(201).json(novoPedido);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },
    
    async listar(req, res) {
        try {
            const pedidos = await Pedido.findAll({
                include: [
                    { model: Usuario, attributes: ['id', 'nome', 'email'] },
                    { model: Produto, attributes: ['nome', 'preco'], through: { attributes: [] } }
                ]
            });
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    
    async atualizar(req, res) {
    try {
        const { id } = req.params; // Captura o ID da URL
        const dadosAtualizados = req.body; // Captura os novos dados do corpo

        // 1. Tenta atualizar o registro
        const [linhasAfetadas] = await Pedido.update(dadosAtualizados, {
            where: { id: id }
        });

        // 2. Verifica se o registro existia
        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Pedido não encontrado." });
        }

        // 3. Opcional: Buscar o objeto atualizado para retornar ao front-end
        const pedidoAtualizado = await Pedido.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['id', 'nome', 'email'] },
                { model: Produto, attributes: ['nome', 'preco'], through: { attributes: [] } }
            ]
        });

        res.json(pedidoAtualizado);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
},

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const pedido = await Pedido.findByPk(id);
            if (!pedido) {
                return res.status(404).json({ mensagem: "Pedido não encontrado" });
            }
            
            // Remove associações com produtos
            await pedido.setProdutos([]);
            // Deleta o pedido
            await pedido.destroy();
            
            res.json({ mensagem: "Pedido deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};