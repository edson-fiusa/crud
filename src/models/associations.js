const usuario = require('./usuarios/usuario');
const Pedido = require('./pedidos/itemPedido');
const Produto = require('./produtos/produtos');

// Usuario tem muitos Pedidos (1:N)
usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(usuario, { foreignKey: 'usuarioId' });

// Pedido pertence a muitos Produtos (N:N)
Pedido.belongsToMany(Produto, {
    through: 'itens_pedido',
    foreignKey: 'pedidoId',
    otherKey: 'produtoId'
});

Produto.belongsToMany(Pedido, {
    through: 'itens_pedido',
    foreignKey: 'produtoId',
    otherKey: 'pedidoId'
});

console.log('✅ Associações configuradas');