const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('crud_marcio', 'root', '135790', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;