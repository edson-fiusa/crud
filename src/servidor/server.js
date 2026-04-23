
const express = require('express');
const sequelize = require('../conexao/conexao'); // ajuste o path conforme sua estrutura
const Usuario = require('../routes/usuarios/usuario.js');
const Pedido = require('../routes/pedidos/pedido.js');
const Produto = require('../routes/produtos/produtos.js');

const app = express();
app.use(express.json());

// ----- ASSOCIAÇÕES COM CASCADE PARA DELETE -----
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Pedido.belongsToMany(Produto, { through: 'ItemPedido', onDelete: 'CASCADE' });
Produto.belongsToMany(Pedido, { through: 'ItemPedido', onDelete: 'CASCADE' });

// ----- ROTAS -----

// Usuário
app.post('/usuario', async (req, res) => {
    try {
        const novo = await Usuario.create(req.body);
        res.json(novo);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get('/usuario', async (req, res) => {
    try {
        const lista = await Usuario.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        await usuario.destroy();
        res.json({ mensagem: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Produto
app.post('/produto', async (req, res) => {
    try {
        const novo = await Produto.create(req.body);
        res.json(novo);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get('/produto', async (req, res) => {
    try {
        const lista = await Produto.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.delete('/produto/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        await produto.destroy();
        res.json({ mensagem: "Produto deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Pedido
app.post('/pedidos', async (req, res) => {
    try {
        const { usuarioId, produtosIds } = req.body;
        const novoPedido = await Pedido.create({ usuarioId });
        if (produtosIds && produtosIds.length > 0) {
            await novoPedido.setProdutos(produtosIds);
        }
        res.json({ mensagem: "Pedido criado!", pedido: novoPedido });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get('/pedidos', async (req, res) => {
    try {
        const lista = await Pedido.findAll({
            include: [
                { model: Usuario, attributes: ['nome'] },
                { model: Produto, through: { attributes: [] } }
            ]
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.delete('/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ erro: "Pedido não encontrado" });
        }
        await pedido.destroy();
        res.json({ mensagem: "Pedido deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// ----- INICIALIZAÇÃO DO SERVIDOR -----
const port = 3000;
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // cuidado: força recriação das tabelas
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log('Banco SQLite sincronizado e tabelas vinculadas!');
    } catch (error) {
        console.error('Erro ao conectar:', error);
    }
});