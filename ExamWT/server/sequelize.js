const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: './postrgres/database.db'
});

module.exports = sequelize;