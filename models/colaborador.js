const Sequelize = require('sequelize');
const db = require('./db');

const colaborador = db.define('colaborador', {
    idColaborador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sonbrenome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    setor: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false
    });

colaborador.sync();

module.exports = colaborador;