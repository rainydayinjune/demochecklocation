const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const Category = require('./category');

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    listed_price: {
        type: Sequelize.DOUBLE,
        validate: {
            min: 1,
        }
    },
    unit: {
        type: Sequelize.STRING,
    },
    cover_image_url: {
        type: Sequelize.TEXT,
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'product',
    timestamps: true,
    freezeTableName: true
});

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
