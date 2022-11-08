const Sequelize = require('sequelize');
const db = require('./db');


const setor = db.define('setor', {
    idsetor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nome_setor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_it: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
setor.sync();

module.exports = setor;