const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');

const Admin = db.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role:{
        // Administrator / Staff
        type: Sequelize.STRING,
        defaultValue: 'staff'
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'admin',
    timestamps: true,
    freezeTableName: true
});


module.exports = Admin;
