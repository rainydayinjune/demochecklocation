require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_TYPE,
    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};