const mysql = require('mysql');
const dbConfig = require('../config/dbConfig')

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        port: '3306',
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        },
    },
    timezone: '+07:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
});

module.exports = sequelize;