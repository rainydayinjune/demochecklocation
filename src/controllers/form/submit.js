const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const sequelize = require('../../databases/dbConnection');
const Link = require('../../models/link');
const Timekeeper = require('../../models/timekeeper');


module.exports = function (router) {
    router.post('/submit/:uuid', async (req, res) => {
        try {
            const { uuid } = req.params;

            const { name, add, lat, long } = req.body;

            await Timekeeper.create({
                name: name,
                add: add,
                lat: lat,
                long: long
            });

            const link = await Link.findOne({ where: { uuid } });
            if (!link) {
                return res.status(404).json({ success: false, message: 'UUID không tồn tại' });
            }
            res.status(200).json({ link: link.dataValues.link_url });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Lỗi khi submit form' });
        }
    });
};