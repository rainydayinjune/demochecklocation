const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const Category = require('../../models/category')
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

        const category = await Category.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!category) {
            throw new ErrorResponse('Không tìm thấy danh mục sản phẩm', 404)
        }

        await Product.update({ deleteAt: new Date }, {
            where: {
                category_id: req.params.id
            }
        })

        category.deletedAt = new Date()
        await category.save()

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            {}
        )
    }))
}