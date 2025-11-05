const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const OrderHistory = require('../models/orderHistory')

const OrderHistoryDetail = db.define('order_history_detail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    cost: {
        type: Sequelize.DOUBLE
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'order_history_detail',
    timestamps: true,
    freezeTableName: true
});

OrderHistory.hasMany(OrderHistoryDetail, { foreignKey: 'order_id' })
OrderHistoryDetail.belongsTo(OrderHistory, { foreignKey: 'order_id' })

module.exports = OrderHistoryDetail;
