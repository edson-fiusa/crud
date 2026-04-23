
const sequelize = require('../conexao/conexao');

async function Conexao() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso!');
        await sequelize.sync({alter: true}); 
    } catch (error) {
        console.error('Erro ao conectar no banco:', error);
    }
}

Conexao();