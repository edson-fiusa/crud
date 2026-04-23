const { DataTypes } = require("sequelize");
const db = require('../../conexao/conexao')

const usuarios = db.define('usuarios', {
nome: {type: DataTypes.STRING, allowNull: false},
email: {type: DataTypes.STRING, allowNull: false,},
senha: { type: DataTypes.STRING, allowNull: false,}
})

usuarios.sync()

module.exports = usuarios
