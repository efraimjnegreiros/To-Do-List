const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Tarefa = sequelize.define('Tarefa', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

});

module.exports = Tarefa;