const Sequelize = require('sequelize');
const db = require('./db');



const setores_envolvidos = db.define('setores_envolvidos', {
    idSetor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    crm_idcrm: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    crm_versao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
},
    {
        timestamps: false
    }
)
setores_envolvidos.sync();

module.exports = setores_envolvidos;