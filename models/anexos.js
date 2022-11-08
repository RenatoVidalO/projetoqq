const Sequelize = require('sequelize');
const db = require('./db');

const anexos = db.define('anexos', {
    idanexo: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    anexos: {
        type: Sequelize.BLOB,
        allowNull: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: true,
    }
},
    {
        freezeTableName: true,
        timestamps: false
    });

anexos.sync();

module.exports = anexos;