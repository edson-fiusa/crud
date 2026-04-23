    const express = require('express');
    const sequelize = require('../conexao/conexao');
    const Usuario = require('../routes/usuarios/usuario.js');
    const Pedido = require('../routes/pedidos/pedido.js');
    const Produto = require('../routes/produtos/produtos.js');

    const app = express();
    app.use(express.json());

    Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
    Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });


    Pedido.belongsToMany(Produto, { through: 'ItemPedido' });
    Produto.belongsToMany(Pedido, { through: 'ItemPedido' });

    app.post('/usuario', async (req, res) => {
        const novo = await Usuario.create(req.body);
        res.json(novo);
    });

    app.get('/usuario', async (req, res) => {
        const lista = await Usuario.findAll();
        res.json(lista);
    });


    app.post('/produto', async (req, res) => {
        const novo = await Produto.create(req.body);
        res.json(novo);
    });

    app.get('/produto', async (req, res) => {
        const lista = await Produto.findAll();
        res.json(lista);
    });

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
        const lista = await Pedido.findAll({
            include: [
                { model: Usuario, attributes: ['nome'] }
                { model: Produto, through: { attributes: [] } }
            ]
        });
        res.json(lista);
    });

    const port = 3000;
    app.listen(port, async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: true });
            console.log(`Servidor rodando em http://localhost:${port}`);
            console.log('Banco SQLite sincronizado e tabelas vinculadas!');
        } catch (error) {
            console.error('Erro ao conectar:', error);
        }
    });
