const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');

const Category = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category_image_url: {
        type: Sequelize.TEXT,
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'category',
    timestamps: true,
    freezeTableName: true
});

module.exports = Category;
