const {DataTypes} = require('sequelize')
const db = require('../../conexao/conexao')
const sequelize = require('../../conexao/conexao')

const produtos = sequelize.define('produtos', {
    nome: {type: DataTypes.STRING, allowNull: false},
    preco: { type: DataTypes.DECIMAL(10,2), allowNull: false},
    estoque: {type: DataTypes.INTEGER(), allowNull: false}
})

produtos.sync()

module.exports = produtos

