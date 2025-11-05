const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const Product = require('../../models/product')
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

        const product = await Product.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!product) {
            throw new ErrorResponse('Không tìm thấy danh mục sản phẩm', 404)
        }

        product.deletedAt = new Date()
        await product.save()

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            {}
        )
    }))
}