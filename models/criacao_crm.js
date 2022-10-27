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
    },
    setor_envolvido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    aceites: {
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