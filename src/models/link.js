const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')

const Link = db.define('link', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'link'
})

module.exports = Link