const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');

const OrderHistory = db.define('order_history', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    order_code: {
        type: Sequelize.STRING,
        unique: true
    },
    additional_notes: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    phone_number: {
        // phải validate +/- number
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        // think later :DDD
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cost: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    products: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'order_history',
    timestamps: true,
    freezeTableName: true
});


module.exports = OrderHistory;
