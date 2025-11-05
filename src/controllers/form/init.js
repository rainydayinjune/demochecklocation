const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const sequelize = require('../../databases/dbConnection');
const Link = require('../../models/link');


module.exports = function (router) {
    router.get('/:uuid', async (req, res) => {
        const { uuid } = req.params;
        const link = await Link.findOne({ where: { uuid } });
        if (!link) return res.status(404).send('Invalid link');

        const addresses = ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh'];

        res.render('form', { uuid, addresses });

    });
};