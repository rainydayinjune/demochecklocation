const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const ProductImage = require('../../models/productImage')
const { adminProtect } = require('../../middlewares/auth')
const { Op } = require('sequelize');

/**
 * @api {DELETE} /categories/{id}
 * @apiName Xóa danh sách mục
 * @apiGroup Delete
 *
 * @apiParam
 **/
module.exports = function (router) {
    router.delete('/:id', adminProtect, asyncHandler(async (req, res, next) => {

        const productImage = await ProductImage.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!productImage) {
            throw new ErrorResponse('Không tìm thấy ảnh', 404)
        }

        await productImage.destroy()

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            {}
        )
    }))
}