const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../../databases/dbConnection');
const Link = require('../../models/link');


module.exports = function (router) {
    router.post('/', asyncHandler(async (req, res, next) => {
        try {
            const { link_url } = req.body;
            if (!link_url) {
                throw new ErrorResponse('link_url is required', 400);
            }

            const newLink = await Link.create({
                uuid: uuidv4(),
                link_url
            });

            const protocol = req.protocol;
            const host = req.get('host');
            const fullUrl = `${protocol}://${host}/form/${newLink.uuid}`;

            successResponse(res, 201, {
                link: newLink,
                url: fullUrl
            });
        } catch (error) {
            throw new ErrorResponse(error.message, error.statusCode || 500);
        }
    }));
};