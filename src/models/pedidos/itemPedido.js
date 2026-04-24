const { DataTypes } = require('sequelize');
const db = require('../../conexao/conexao');

const Pedidos = db.define('pedidos', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    dataPedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'pendente' },
    valorTotal: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }
}, { timestamps: true });

module.exports = Pedidos;