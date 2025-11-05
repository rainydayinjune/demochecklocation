const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const Product = require('./product');

const ProductDetail = db.define('product_detail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    uses: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'product_detail',
    timestamps: true,
    freezeTableName: true
});

Product.hasOne(ProductDetail, { foreignKey: 'product_id' });
ProductDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductDetail;
