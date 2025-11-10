const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const QRCode = require('qrcode');
const Link = require('../../models/link');


module.exports = function (router) {
    router.post('/test', asyncHandler(async (req, res, next) => {
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

            const dataToEncode = fullUrl || 'Default QR Data';
            let qrDataURL = null;
            try {
                qrDataURL = await QRCode.toDataURL(dataToEncode, {
                    errorCorrectionLevel: 'H',
                    type: 'image/png',
                    width: 256
                });
            } catch (error) {
                throw new ErrorResponse(error.message, error.statusCode || 500);
            }
            successResponse(res, 201, {
                link: newLink,
                url: fullUrl,
                image: qrDataURL
            });
        } catch (error) {
            throw new ErrorResponse(error.message, error.statusCode || 500);
        }
    }));
};