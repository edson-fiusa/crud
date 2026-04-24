const { DataTypes } = require('sequelize');
const db = require('../../conexao/conexao');

const Produtos = db.define('produtos', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, { timestamps: true });

module.exports = Produtos;