const Produto = require('../models/produtos/produtos');

module.exports = {
    async buscarPorId(req, res) {
    try {
        const prod = await Produto.findByPk(req.params.id);
        if (!prod) return res.status(404).json({ mensagem: "Produto não encontrado" });
        res.json(prod);
    } catch (e) { res.status(500).json({ erro: e.message }); }
},

    async listar(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.json(produtos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    
    async criar(req, res) {
        try {
            const { nome, preco, estoque } = req.body;
            const novo = await Produto.create({ nome, preco, estoque });
            res.status(201).json(novo);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },
    
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Produto.destroy({ where: { id } });
            if (deletado) {
                res.json({ mensagem: "Produto deletado com sucesso!" });
            } else {
                res.status(404).json({ mensagem: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

async atualizar(req, res) {
    try {
        const { id } = req.params;
        const dadosNovos = req.body;

        const [atualizado] = await Produto.update(dadosNovos, {
            where: { id }
        });

        if (atualizado) {
            const produtoAtualizado = await Produto.findByPk(id);
            res.json({ 
                mensagem: "Produto atualizado com sucesso!", 
                produto: produtoAtualizado 
            });
        } else {
            res.status(404).json({ mensagem: "Produto não encontrado para atualização" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}
};