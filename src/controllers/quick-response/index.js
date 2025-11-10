const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')

const sequelize = require('../../databases/dbConnection');
const Link = require('../../models/link');


module.exports = function (router) {
    router.get('/', asyncHandler(async (req, res, next) => {

        const uuid = 'uu ai di';
        const addresses = ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh'];

        res.render('create-link', { uuid, addresses });
    }));
};