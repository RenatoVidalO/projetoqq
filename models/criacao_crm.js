const Sequelize = require('sequelize');
const db = require('./db');


const criacao_crm = db.define('crm', {
    idcrm: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    versao_crm: {
        type: Sequelize.INTEGER,
        default: 1,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    comportamento_off: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    demanda: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
    ,
    alternativa: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
    ,
    impacto: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
    ,
    data_entrega: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    aceites: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    colaborador_idColaborador: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    anexos_idanexo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    feedback_id_feedback: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false
    });

criacao_crm.sync();

module.exports = criacao_crm;