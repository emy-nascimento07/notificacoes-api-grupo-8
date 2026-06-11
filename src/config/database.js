const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( // Cria a conexão 
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql', // Informa que estamos usando o MYSQL
        logging: process.env.NODE_ENV === 'development' ? console.log : false, // Mostra as queries no console.log
    },
);

module.exports = sequelize;