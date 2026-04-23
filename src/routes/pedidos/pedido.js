const {DataTypes} = require('sequelize')
const db = require('../../conexao/conexao')

const pedidos = db.define('pedidos', {
    // Remova o usuario_id e produto_id manuais daqui. 
    // As associações no server.js vão criar as chaves corretas.
    quantidade: { type: DataTypes.INTEGER, allowNull: false }
})

module.exports = pedidos