const express = require('express');
const mysql = require('mysql');
const constants = require('../../utils/constants');
const { successResponse, errorResponse } = require('../../utils/responseModel')

module.exports = function (router) {
    router.get('/test-connection', function (req, res, next) {
        try {
            var connection = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
                database: process.env.DB_NAME
            });

            // Kiểm tra kết nối cơ sở dữ liệu
            connection.connect(function (err) {
                if (err) {
                    errorResponse(
                        res,
                        'Database connected fail'
                    );
                }
                else {
                    successResponse(
                        res,
                        constants.STATUS_SUCCESS,
                        'Database connected successfuly'
                    )
                }
            });
        } catch (error) {
            // Xử lý lỗi ở đây nếu cần
        }
    });
};
