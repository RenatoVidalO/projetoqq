const Sequelize = require('sequelize');
const db = require('./db');

const login = db.define('colaborador', {
    idColaborador: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sobrenome: {
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
    }
    ,
    setor: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    ,
    is_it: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false
    });

login.sync();

module.exports = login;