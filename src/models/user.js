const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    facebook_id: {
        type: Sequelize.STRING
    },
    facebook_name: {
        type: Sequelize.STRING,
    },
    google_id: {
        type: Sequelize.STRING
    },
    google_name: {
        type: Sequelize.STRING
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'user',
    timestamps: true,
    freezeTableName: true
});


module.exports = User;
