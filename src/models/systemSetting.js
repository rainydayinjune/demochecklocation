const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');

const SystemSetting = db.define('system_setting', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    project_name: {
        type: Sequelize.STRING,
        default: 'Onana Store'
    },
    shipping_fee: {
        type: Sequelize.DOUBLE
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'system_setting',
    timestamps: true,
    freezeTableName: true
});


module.exports = SystemSetting;
