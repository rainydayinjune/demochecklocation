const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');

const Timekeeper = db.define('timekeeper', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    add: {
        type: Sequelize.STRING,
        allowNull: false
    },
    long: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'timekeeper',
    timestamps: true,
    freezeTableName: true
});

module.exports = Timekeeper;