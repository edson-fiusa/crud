
const express = require('express');
const app = express();
const db = require('../conexao/conexao');

require('../models/associations');

const routes = require('../routes');

app.use(express.json());
app.use(routes);

const PORT = 3000;

db.sync({ force: true })
    .then(() => {
        console.log(' Banco de dados conectado e sincronizado');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error(' Erro ao conectar banco:', err);
    });

