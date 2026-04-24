const Usuario = require('../models/usuarios/usuario');

module.exports = {
    async buscarPorId(req, res) {
    try {
        const user = await Usuario.findByPk(req.params.id);
        if (!user) return res.status(404).json({ mensagem: "Usuário não encontrado" });
        res.json(user);
    } catch (e) { res.status(500).json({ erro: e.message }); }
},

    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    
    async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const novo = await Usuario.create({ nome, email, senha });
            res.status(201).json(novo);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },
    
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Usuario.destroy({ where: { id } });
            if (deletado) {
                res.json({ mensagem: "Usuário deletado com sucesso!" });
            } else {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async atualizar(req, res) {
    try {
        const { id } = req.params;
        const dadosNovos = req.body;

        const [atualizado] = await Usuario.update(dadosNovos, {
            where: { id }
        });

        if (atualizado) {

            const usuarioAtualizado = await Usuario.findByPk(id);
            res.json({ 
                mensagem: "Usuário atualizado com sucesso!", 
                usuario: usuarioAtualizado 
            });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado ou nada foi alterado" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}
};