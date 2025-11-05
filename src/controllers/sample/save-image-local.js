const path = require('path');
const constants = require('../../utils/constants');
const { successResponse, errorResponse } = require('../../utils/responseModel')
const upload = require('../../middlewares/multer')
/**
 * @api {post} /test-connection
 * @apiName Test Connection
 * @apiGroup Check
 *
 * @apiParam {String} null
 **/
module.exports = function (router) {
    router.post('/save-image-local', upload.any(), function (req, res, next) {
        try {
            const nonImageFiles = req.files.filter(file => !file.mimetype.startsWith('image/'));
            if (nonImageFiles.length > 0) {
                throw new Error(constants.IMAGE_ALLOWED_ONLY);
            }

            const image = req.files.find((file) => file.fieldname === 'storage');
            const path = image.path.substring(11).replace("\\", "/");

            successResponse(
                res,
                constants.STATUS_SUCCESS,
                path
            )
        } catch (error) {
            // Xóa ảnh

            res.status(400);
            errorResponse(
                res,
                error.message
            )
        }
    })
}