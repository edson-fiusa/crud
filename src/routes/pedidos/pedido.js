const {DataTypes} = require('sequelize')
const db = require('../../conexao/conexao')

const pedidos = db.define('pedidos', {
    quantidade: { type: DataTypes.INTEGER, allowNull: false }
})

module.exports = pedidos
