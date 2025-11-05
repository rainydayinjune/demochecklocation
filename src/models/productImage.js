const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const Product = require('./product');

const ProductImage = db.define('product_image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'product_image',
    timestamps: true,
    freezeTableName: true
});

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductImage;
