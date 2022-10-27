const Sequelize = require('sequelize');
const db = require('./db');

const feedback = db.define('feedback', {
    id_feedback: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sugestao: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false
    });

feedback.sync();

module.exports = feedback;