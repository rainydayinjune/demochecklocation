const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')

const Blacklist = db.define('blacklist', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true,
    tableName: 'blacklist'
})

module.exports = Blacklist