const { DataTypes } = require("sequelize");
const db = require('../../conexao/conexao');

const Usuarios = db.define('usuarios', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

module.exports = Usuarios;