const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const Product = require('./product');

const Promote = db.define('promote', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    buy_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    buy_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'promote',
    timestamps: true,
    freezeTableName: true
});

Product.hasOne(Promote, { foreignKey: 'product_id' });
Promote.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Promote;